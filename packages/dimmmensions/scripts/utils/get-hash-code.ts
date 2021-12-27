/**
 * Generate a hash code from an object.
 *
 * @param object - The object to generate a hash code from.
 */
export function getHashCode(object: Record<string, any>) {
  let hashCode = 0

  for (const character of JSON.stringify(object)) {
    hashCode = Math.trunc(
      Math.imul(31, hashCode) + (character.codePointAt(0) ?? 0)
    )
  }

  return hashCode
}
