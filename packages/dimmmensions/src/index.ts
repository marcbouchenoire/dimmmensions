import data from "./data/dimensions.json"
import { isNumber } from "./guards"
import { Dimensions } from "./types"
import { isMultiple } from "./utils/is-multiple"

export const dimensions = data as Dimensions[]

export function getDimensions(): Dimensions[]
export function getDimensions(width: number, height: number): Dimensions[]
export function getDimensions(width?: number, height?: number): Dimensions[] {
  if (!(isNumber(width) && isNumber(height))) {
    return data as Dimensions[]
  }

  return (data as Dimensions[]).filter((dimensions) => {
    const isCorrectWidth =
      isMultiple(width, dimensions.portrait.screen.width, dimensions.scale) ||
      isMultiple(width, dimensions.landscape.screen.width, dimensions.scale)
    const isCorrectHeight =
      isMultiple(height, dimensions.portrait.screen.height, dimensions.scale) ||
      isMultiple(height, dimensions.landscape.screen.height, dimensions.scale)

    return isCorrectWidth && isCorrectHeight
  })
}

export * from "./types"
