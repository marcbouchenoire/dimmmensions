import { dimensions, Dimensions } from "ios-dimensions"

export function getDimensions() {
  const devices: Record<string, Dimensions> = {}
  const sortedDimensions = dimensions.sort(
    (a, b) => a.portrait.screen.width - b.portrait.screen.width
  )

  for (const dimensions of sortedDimensions) {
    const label = `${dimensions.device} (${dimensions.portrait.screen.width} × ${dimensions.portrait.screen.height})`

    devices[label] = dimensions
  }

  return devices
}
