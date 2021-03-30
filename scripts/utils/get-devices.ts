import execa from "execa"

export interface Device {
  dataPath: string
  logPath: string
  udid: string
  isAvailable: boolean
  deviceTypeIdentifier: string
  state: string
  name: string
}

export async function getDevices() {
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
  const devices: Device[] = platforms[platform]

  return devices
}

export function getDeviceNames(devices: Device[]) {
  return devices.map((device) => device.name)
}
