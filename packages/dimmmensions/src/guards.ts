/**
 * Whether the value is a number.
 *
 * @param value - The value to check.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}
