import { Dimensions } from "../../src/types"

export function getHashCode(dimensions: Dimensions) {
  return Array.from(JSON.stringify(dimensions)).reduce(
    (string, character) =>
      (Math.imul(31, string) + character.charCodeAt(0)) | 0,
    0
  )
}
