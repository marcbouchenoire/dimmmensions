export function isMultiple(a: number, b: number, multiple = 1) {
  return a % b === 0 && a <= b * multiple
}
