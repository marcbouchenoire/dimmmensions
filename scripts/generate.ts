import withApp from "app-exists"
import withCommand from "command-exists"
import execa from "execa"
import globby from "globby"
import getJSON from "load-json-file"
import writeJSON from "write-json-file"
import { getSimulators } from "./utils/get-simulators"
import { isMacOS } from "./utils/is-macOS"
import { trash } from "./utils/trash"

const SCHEME = "dimensions"
const PROJECT = "./src/dimensions/dimensions.xcodeproj"
const DERIVED_DATA_PATH = "/tmp/com.marcbouchenoire.dimensions"

function exit(condition: boolean, message: string) {
  if (!condition) return

  console.error(message)

  return process.exit(0)
}

async function generate() {
  exit(!isMacOS(), "macOS is required.")
  exit(!withApp("Xcode"), "Xcode is required.")
  exit(!withCommand("xcodebuild"), "Xcode Command Line Tools are required.")
  exit(!withCommand("xcparse"), "xcparse is required.")

  try {
    let dimensions = []
    const simulators = await getSimulators()

    for (const simulator of simulators) {
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
        `platform=iOS Simulator,name=${simulator.name}`
      ])

      const [output] = (await globby(
        `${DERIVED_DATA_PATH}/Logs/Test/*.xcresult`,
        {
          onlyFiles: false
        }
      )) ?? [undefined]

      await execa("xcparse", ["attachments", output, DERIVED_DATA_PATH])

      const attachments = await globby(`${DERIVED_DATA_PATH}/*.txt`)

      for (const attachment of attachments) {
        dimensions.push(await getJSON(attachment))
      }

      await trash(DERIVED_DATA_PATH)
    }

    dimensions = dimensions.filter((dimension, index, dimensions) => {
      return dimensions.indexOf(dimension) === index
    })

    await writeJSON("./src/dimensions.json", dimensions)
  } catch (error) {
    console.error(error)
  }
}

generate()
