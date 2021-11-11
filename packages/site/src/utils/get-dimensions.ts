import { Dimensions, dimensions } from "dimmmensions"

export function getDimensions() {
  const attributedDimensions: Record<string, Dimensions> = {}
  const sortedDimensions = dimensions.sort(
    (a, b) => a.portrait.screen.width - b.portrait.screen.width
  )

  for (const dimensions of sortedDimensions) {
    const label = `${dimensions.device} (${dimensions.portrait.screen.width} × ${dimensions.portrait.screen.height})`

    attributedDimensions[label] = dimensions
  }

  return attributedDimensions
}
