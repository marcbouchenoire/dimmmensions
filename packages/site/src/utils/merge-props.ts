import clsx from "clsx"
import { Intersection, Tuples } from "../types"

export function mergeProps<T extends Record<string, any>[]>(...args: T) {
  const mergedProps = { ...args[0] }

  for (const props of args) {
    for (const prop in props) {
      const a = mergedProps[prop]
      const b = props[prop]

      if (prop === "className") {
        mergedProps[prop] = clsx(a, b)
      } else {
        mergedProps[prop] = b ?? a
      }
    }
  }

  return mergedProps as Intersection<Tuples<T>>
}
