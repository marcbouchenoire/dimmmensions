import * as assert from "uvu/assert"
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
import { describe } from "./helpers"

describe("isNumber", (it) => {
  it("should return true for numbers", () => {
    assert.equal(isNumber(number), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isNumber(array), false)
    assert.equal(isNumber(boolean), false)
    assert.equal(isNumber(fun), false)
    assert.equal(isNumber(map), false)
    assert.equal(isNumber(object), false)
    assert.equal(isNumber(set), false)
    assert.equal(isNumber(string), false)
  })
})
