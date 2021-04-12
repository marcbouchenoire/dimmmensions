import { isNumber } from "../src/guards"
import {
  array,
  boolean,
  fun,
  map,
  number,
  object,
  set,
  string
} from "./constants"

describe("isNumber", () => {
  test("should return true for numbers", () => {
    expect(isNumber(number)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isNumber(array)).toBeFalsy()
    expect(isNumber(boolean)).toBeFalsy()
    expect(isNumber(fun)).toBeFalsy()
    expect(isNumber(map)).toBeFalsy()
    expect(isNumber(object)).toBeFalsy()
    expect(isNumber(set)).toBeFalsy()
    expect(isNumber(string)).toBeFalsy()
  })
})
