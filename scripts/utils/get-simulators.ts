import execa from "execa"

interface Simulator {
  dataPath: string
  logPath: string
  udid: string
  isAvailable: boolean
  deviceTypeIdentifier: string
  state: string
  name: string
}

export async function getSimulators() {
  const { stdout } = await execa("xcrun", [
    "simctl",
    "list",
    "devices",
    "--json"
  ])
  const devices = (JSON.parse(stdout) ?? {}).devices
  const [version] = Object.keys(devices)
    .filter((version) => version.includes("iOS"))
    .sort()
    .reverse()
  const simulators: Simulator[] = devices[version]

  return simulators
}

export function getSimulatorNames(simulators: Simulator[]) {
  return simulators.map((simulator) => simulator.name)
}
