/**
 * Whether two numbers are multiples of a common third number.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @param multiple - The multiple value.
 */
export function isMultiple(a: number, b: number, multiple: number) {
  return a % b === 0 && a <= b * multiple
}
