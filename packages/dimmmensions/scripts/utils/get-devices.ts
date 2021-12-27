import { execa } from "execa"

export interface SimulatorDevice {
  /**
   * A formatted device name.
   */
  name: string
}

/**
 * Get a formatted name from a device platform.
 *
 * @param platform - The device platform to get the name of.
 */
function getPlatformName(platform: string) {
  const [, name, version] = platform.match(/([A-Za-z]+)-([\d-]+)/) ?? []

  return `${name} ${version.replace("-", ".")}`
}

/**
 * Get a list of all iOS and iPadOS devices from Xcode.
 */
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
