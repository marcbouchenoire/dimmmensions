import { Dimensions } from "../generate"

export function getArea(dimensions: Dimensions) {
  return (
    dimensions.portrait.screen.width * dimensions.portrait.screen.height +
    dimensions.landscape.screen.width * dimensions.landscape.screen.height
  )
}
