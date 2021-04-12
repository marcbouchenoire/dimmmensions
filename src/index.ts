import dimensions from "./dimensions.json"
import { isNumber } from "./guards"
import { Dimensions } from "./types"
import { isMultiple } from "./utils/is-multiple"

export function getDimensions(): Dimensions[]
export function getDimensions(width: number, height: number): Dimensions[]
export function getDimensions(width?: number, height?: number): Dimensions[] {
  if (!(isNumber(width) && isNumber(height))) {
    return dimensions as Dimensions[]
  }

  return (dimensions as Dimensions[]).filter((dimensions) => {
    const isCorrectWidth =
      isMultiple(width, dimensions.portrait.screen.width, dimensions.scale) ||
      isMultiple(width, dimensions.landscape.screen.width, dimensions.scale)
    const isCorrectHeight =
      isMultiple(height, dimensions.portrait.screen.height, dimensions.scale) ||
      isMultiple(height, dimensions.landscape.screen.height, dimensions.scale)

    return isCorrectWidth && isCorrectHeight
  })
}
