export function isMultiple(a: number, b: number, multiple: number) {
  return a % b === 0 && a <= b * multiple
}
