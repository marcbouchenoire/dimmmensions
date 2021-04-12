export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}
