import { Dimensions } from "../../src/types"

export function getHashCode(dimensions: Dimensions) {
  let hashCode = 0

  for (const character of [...JSON.stringify(dimensions)]) {
    hashCode = Math.trunc(Math.imul(31, hashCode) + character.charCodeAt(0))
  }

  return hashCode
}
