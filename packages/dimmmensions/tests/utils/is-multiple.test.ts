import * as assert from "uvu/assert"
import { isMultiple } from "../../src/utils/is-multiple"
import { describe } from "../helpers"

describe("isMultiple", (it) => {
  it("should return true for multiples below the multiple threshold", () => {
    assert.equal(isMultiple(16, 8, 2), true)
  })

  it("should return false for multiples above the multiple threshold", () => {
    assert.equal(isMultiple(16, 8, 1), false)
  })

  it("should return false for non-multiples", () => {
    assert.equal(isMultiple(12, 8, 2), false)
  })
})
