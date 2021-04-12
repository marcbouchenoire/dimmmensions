import dimensions from "./dimensions.json"
import { isNumber } from "./guards"
import { Dimensions } from "./types"

export function getDimensions(): Dimensions[]
export function getDimensions(width: number, height: number): Dimensions[]
export function getDimensions(width?: number, height?: number): Dimensions[] {
  if (!(isNumber(width) && isNumber(height))) {
    return dimensions as Dimensions[]
  }

  return (dimensions as Dimensions[]).filter((dimensions) => {
    const isCorrectWidth =
      width === dimensions.portrait.screen.width ||
      width === dimensions.landscape.screen.width
    const isCorrectHeight =
      height === dimensions.portrait.screen.height ||
      height === dimensions.landscape.screen.height

    return isCorrectWidth && isCorrectHeight
  })
}
