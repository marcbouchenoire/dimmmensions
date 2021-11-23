import { execa } from "execa"

export interface SimulatorDevice {
  dataPath: string
  deviceTypeIdentifier: string
  isAvailable: boolean
  logPath: string
  name: string
  state: string
  udid: string
}

function getPlatformName(platform: string) {
  const [, name, version] = platform.match(/([A-Za-z]+)-([\d-]+)/) ?? []

  return `${name} ${version.replace("-", ".")}`
}

export function getDeviceNames(devices: SimulatorDevice[]) {
  return devices.map((device) => device.name)
}

export async function getDevices(): Promise<[SimulatorDevice[], string]> {
  const { stdout } = await execa("xcrun", [
    "simctl",
    "list",
    "devices",
    "--json"
  ])
  const platforms = (JSON.parse(stdout) ?? {}).devices
  const [platform] = Object.keys(platforms)
    .filter((platform) => platform.includes("iOS"))
    .sort()
    .reverse()

  const devices: SimulatorDevice[] = platforms[platform]

  return [devices, getPlatformName(platform)]
}
