import { isMultiple } from "../../src/utils/is-multiple"

describe("isMultiple", () => {
  test("should return true for multiples below the multiple threshold", () => {
    expect(isMultiple(16, 8, 2)).toBeTruthy()
  })

  test("should return false for multiples above the multiple threshold", () => {
    expect(isMultiple(16, 8, 1)).toBeFalsy()
  })

  test("should return false for non-multiples", () => {
    expect(isMultiple(12, 8, 2)).toBeFalsy()
  })
})
