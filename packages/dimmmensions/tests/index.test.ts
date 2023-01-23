import * as assert from "uvu/assert"
import type { ZodError } from "zod"
import { fromZodError } from "zod-validation-error"
import { dimensions, getDimensions } from "../src"
import { DimensionsSchema } from "../src/types"
import { describe } from "./helpers"

const SCREEN_WIDTH = 375
const SCREEN_HEIGHT = 667

describe("dimensions", (it) => {
  it("should contain valid dimensions", () => {
    for (const device of dimensions) {
      try {
        DimensionsSchema.parse(device)
      } catch (error) {
        const validationError = fromZodError(error as ZodError, {
          prefix: `Validation error in "${device.name}"`
        })

        throw new Error(validationError.message, {
          cause: validationError.cause
        })
      }
    }
  })
})

describe("getDimensions", (it) => {
  it("return all dimensions when provided nothing", () => {
    assert.equal(getDimensions(), dimensions)
  })

  it("should match devices when provided a screen size", () => {
    const dimensions = getDimensions(SCREEN_WIDTH, SCREEN_HEIGHT)

    for (const device of dimensions) {
      assert.is(device.portrait.screen.width, SCREEN_WIDTH)
      assert.is(device.portrait.screen.height, SCREEN_HEIGHT)
    }

    assert.equal(dimensions, getDimensions(SCREEN_HEIGHT, SCREEN_WIDTH))
    assert.equal(dimensions, getDimensions(SCREEN_WIDTH * 2, SCREEN_HEIGHT * 2))
  })

  it("should match devices in all orientations and screen scales", () => {
    const dimensions = getDimensions(SCREEN_WIDTH, SCREEN_HEIGHT)

    assert.equal(dimensions, getDimensions(SCREEN_HEIGHT, SCREEN_WIDTH))
    assert.equal(dimensions, getDimensions(SCREEN_WIDTH * 2, SCREEN_HEIGHT * 2))
  })
})
