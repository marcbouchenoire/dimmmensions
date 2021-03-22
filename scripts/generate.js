const { promisify } = require("util")
const withApp = require("app-exists")
const withCommand = require("command-exists")
const execa = require("execa")
const globby = require("globby")
const getJSON = require("load-json-file")
const rimraf = promisify(require("rimraf"))
const writeJSON = require("write-json-file")

const SCHEME = "dimensions"
const PROJECT = "./src/dimensions/dimensions.xcodeproj"
const DERIVED_DATA_PATH = "/tmp/com.marcbouchenoire.dimensions"
const DEVICES = [
  "iPhone 8",
  "iPhone 8 Plus",
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max",
  "iPhone 12",
  "iPhone 12 mini",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone SE (2nd generation)",
  "iPad Pro (9.7-inch)",
  "iPad Pro (11-inch) (2nd generation)",
  "iPad Pro (12.9-inch) (4th generation)",
  "iPad (8th generation)",
  "iPad Air (4th generation)"
]

function isMacOS() {
  return process.platform === "darwin"
}

function exit(condition, message) {
  if (condition) {
    console.error(message)

    return process.exit(0)
  }
}

async function generate() {
  exit(!isMacOS(), "macOS is required.")
  exit(!withApp("Xcode"), "Xcode is required.")
  exit(!withCommand("xcodebuild"), "Xcode Command Line Tools are required.")
  exit(!withCommand("xcparse"), "xcparse is required.")

  try {
    let dimensions = []

    for (const device of DEVICES) {
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
        `platform=iOS Simulator,name=${device}`
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

      await rimraf(DERIVED_DATA_PATH)
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
