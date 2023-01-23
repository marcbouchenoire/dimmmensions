import data from "./data/dimensions.json"
import { isNumber } from "./guards"
import type { Dimensions } from "./types"
import { isMultiple } from "./utils/is-multiple"

/**
 * A collection of all dimensions.
 *
 * @example
 *
 * ```js
 * import { dimensions } from "dimmmensions"
 *
 * // dimensions: [Dimensions, Dimensions, Dimensions...]
 * ```
 */
export const dimensions = data as Dimensions[]

/**
 * Get dimensions, optionally matching a specified screen size.
 *
 * @param [width] - A screen width.
 * @param [height] - A screen height.
 * @returns A collection of dimensions.
 *
 * @example
 *
 * ```js
 * const symbol = getSymbol("scribble.variable")
 *
 * // symbol: "􀤑"
 * ```
 */
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

export type {
  Device,
  Traits,
  Screen,
  Frame,
  SizeClass,
  SizeClasses,
  Orientation,
  OrientedDimensions,
  Dimensions
} from "./types"
