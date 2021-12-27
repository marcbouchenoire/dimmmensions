/**
 * Get a formatted percentage from two numbers.
 *
 * @param a - The part number.
 * @param b - The whole number.
 */
export function getPercentage(a: number, b: number) {
  return `${(a / b) * 100}%`
}
