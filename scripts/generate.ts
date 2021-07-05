import withApp from "app-exists"
import withCommand from "command-exists"
import execa from "execa"
import globby from "globby"
import Listr, { ListrTask } from "listr"
import getJSON from "load-json-file"
import writeJSON from "write-json-file"
import {
  Device,
  Dimensions,
  ExtractedDimensions,
  OrientedDimensions
} from "../src/types"
import { getDevices, SimulatorDevice } from "./utils/get-devices"
import { getHashCode } from "./utils/get-hash-code"
import { isMacOS } from "./utils/is-macOS"
import { isSilentError, SilentError } from "./utils/silent-error"
import { trash } from "./utils/trash"

const SCHEME = "dimensions"
const PROJECT = "./src/dimensions/dimensions.xcodeproj"
const DERIVED_DATA = "/tmp/com.marcbouchenoire.dimensions"
const DIMENSIONS = "./src/data/dimensions.json"
const LOGS = "./src/data/logs.json"

interface Context {
  devices: SimulatorDevice[]
  platform: string
  dimensions: Dimensions[]
}

const tasks = new Listr([
  {
    title: "Verifying requirements",
    task: () => {
      if (!isMacOS()) {
        throw new SilentError("Xcode is only available on macOS.")
      } else if (!withApp("Xcode")) {
        throw new SilentError(
          `Xcode is required. (https://developer.apple.com/xcode/)")}`
        )
      } else if (!withCommand("xcodebuild")) {
        throw new SilentError(
          "Xcode Command Line Tools are required. (https://developer.apple.com/xcode/resources/)"
        )
      } else if (!withCommand("xcparse")) {
        throw new SilentError(
          "xcparse is required. (https://github.com/ChargePoint/xcparse)"
        )
      }
    }
  },
  {
    title: "Gathering devices",
    task: async (context: Context) => {
      const [devices, platform] = await getDevices()

      context.devices = devices
      context.platform = platform
    }
  },
  {
    title: "Gathering dimensions",
    task: (context: Context) => {
      const tasks: ListrTask[] = []
      context.dimensions = []

      for (const device of context.devices) {
        const task: ListrTask = {
          title: device.name,
          task: () => {
            return new Listr([
              {
                title: "Extracting dimensions",
                task: async () => {
                  await execa("xcodebuild", [
                    "build",
                    "test",
                    "-quiet",
                    "-scheme",
                    SCHEME,
                    "-project",
                    PROJECT,
                    "-derivedDataPath",
                    DERIVED_DATA,
                    "-destination",
                    `platform=iOS Simulator,name=${device.name}`
                  ])
                }
              },
              {
                title: "Parsing extracted dimensions",
                task: async () => {
                  const [output] = (await globby(
                    `${DERIVED_DATA}/Logs/Test/*.xcresult`,
                    {
                      onlyFiles: false
                    }
                  )) ?? [undefined]

                  await execa("xcparse", ["attachments", output, DERIVED_DATA])

                  const attachments = await globby(`${DERIVED_DATA}/*.txt`)

                  let device: Device
                  let scale: number
                  let radius: number
                  let portrait: OrientedDimensions
                  let landscape: OrientedDimensions

                  for (const attachment of attachments) {
                    const {
                      orientation,
                      device: extractedDevice,
                      scale: extractedScale,
                      radius: extractedRadius,
                      ...dimensions
                    }: ExtractedDimensions = await getJSON(attachment)

                    device = extractedDevice as Device
                    scale = extractedScale
                    radius = extractedRadius

                    if (orientation === "portrait") {
                      portrait = dimensions
                    } else {
                      landscape = dimensions
                    }
                  }

                  const dimensions: Dimensions = {
                    device,
                    scale,
                    radius,
                    portrait,
                    landscape
                  }

                  const isUniqueDimensions = !context.dimensions
                    .map((dimensions) => JSON.stringify(dimensions))
                    .includes(JSON.stringify(dimensions))

                  if (isUniqueDimensions) {
                    context.dimensions.push(dimensions)
                  }
                }
              },
              {
                title: "Cleaning up extraction cache",
                task: async () => {
                  await trash(DERIVED_DATA)
                }
              }
            ])
          }
        }

        tasks.push(task)
      }

      return new Listr(tasks)
    }
  },
  {
    title: "Sorting dimensions",
    task: (context: Context) => {
      context.dimensions = context.dimensions.sort((a, b) => {
        return getHashCode(a) - getHashCode(b)
      })
    }
  },
  {
    title: "Generating files",
    task: async (context: Context) => {
      await writeJSON(DIMENSIONS, context.dimensions)
      await writeJSON(LOGS, { platform: context.platform })
    }
  }
])

tasks.run().catch((error: Error | SilentError) => {
  if (isSilentError(error)) return

  console.error(error)
})
