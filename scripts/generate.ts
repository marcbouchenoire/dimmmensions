import withApp from "app-exists"
import withCommand from "command-exists"
import execa from "execa"
import globby from "globby"
import Listr, { ListrTask } from "listr"
import getJSON from "load-json-file"
import writeJSON from "write-json-file"
import { getArea } from "./utils/get-area"
import { getDevices, Device } from "./utils/get-devices"
import { isMacOS } from "./utils/is-macOS"
import { isSilentError, SilentError } from "./utils/silent-error"
import { trash } from "./utils/trash"

const SCHEME = "dimensions"
const PROJECT = "./src/dimensions/dimensions.xcodeproj"
const DERIVED_DATA_PATH = "/tmp/com.marcbouchenoire.dimensions"

interface Context {
  devices: Device[]
  dimensions: Dimensions[]
}

export interface Dimensions extends Record<Orientation, OrientedDimensions> {
  scale: number
}

export interface OrientedDimensions {
  screen: Screen
  sizeClass: SizeClasses
  safeArea: Frame
  layoutMargins: Frame
  readableContent: Frame
}

export interface ExtractedDimensions extends OrientedDimensions {
  orientation: Orientation
  scale: number
}

type Orientation = "portrait" | "landscape"

type SizeClass = "unspecified" | "compact" | "regular"

interface Screen {
  width: number
  height: number
}

interface SizeClasses {
  horizontal: SizeClass
  vertical: SizeClass
}

interface Frame {
  top: number
  right: number
  bottom: number
  left: number
}

const tasks = new Listr([
  {
    title: "Verifying requirements",
    task: () => {
      if (!isMacOS()) {
        throw new SilentError("macOS is required.")
      } else if (!withApp("Xcode")) {
        throw new SilentError("Xcode is required.")
      } else if (!withCommand("xcodebuild")) {
        throw new SilentError("Xcode Command Line Tools are required.")
      } else if (!withCommand("xcparse")) {
        throw new SilentError("xcparse is required.")
      }
    }
  },
  {
    title: "Gathering devices",
    task: async (context: Context) => {
      context.devices = await getDevices()
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
                    DERIVED_DATA_PATH,
                    "-destination",
                    `platform=iOS Simulator,name=${device.name}`
                  ])
                }
              },
              {
                title: "Parsing extracted dimensions",
                task: async () => {
                  const [output] = (await globby(
                    `${DERIVED_DATA_PATH}/Logs/Test/*.xcresult`,
                    {
                      onlyFiles: false
                    }
                  )) ?? [undefined]

                  await execa("xcparse", [
                    "attachments",
                    output,
                    DERIVED_DATA_PATH
                  ])

                  const attachments = await globby(`${DERIVED_DATA_PATH}/*.txt`)

                  let scale: number
                  let portrait: OrientedDimensions
                  let landscape: OrientedDimensions

                  for (const attachment of attachments) {
                    const {
                      orientation,
                      scale: extractedScale,
                      ...dimensions
                    }: ExtractedDimensions = await getJSON(attachment)

                    scale = extractedScale

                    if (orientation === "portrait") {
                      portrait = dimensions
                    } else {
                      landscape = dimensions
                    }
                  }

                  const dimensions: Dimensions = {
                    scale,
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
                  await trash(DERIVED_DATA_PATH)
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
        return getArea(a) - getArea(b)
      })
    }
  },
  {
    title: "Generating file",
    task: async (context: Context) => {
      await writeJSON("./src/dimensions.json", context.dimensions)
    }
  }
])

tasks.run().catch((error: Error | SilentError) => {
  if (isSilentError(error)) return

  console.error(error)
})
