import rimraf from "rimraf"

export function trash(path: string) {
  return new Promise((resolve) => rimraf(path, resolve))
}
