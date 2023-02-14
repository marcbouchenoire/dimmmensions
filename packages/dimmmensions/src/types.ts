import { z } from "zod"

const DeviceSchema = z.enum(["iPhone", "iPad"])

const TraitsSchema = z.object({
  /**
   * The device's type.
   */
  device: DeviceSchema,

  /**
   * The device's name.
   */
  name: z.string(),

  /**
   * The screen's corner radius.
   */
  radius: z.number(),

  /**
   * The screen's scale.
   */
  scale: z.number()
})

const ScreenSchema = z.object({
  /**
   * The screen's width.
   */
  width: z.number(),

  /**
   * The screen's height.
   */
  height: z.number()
})

const FrameSchema = z.object({
  /**
   * The frame's offset from the top.
   */
  top: z.number(),

  /**
   * The frame's offset from the right.
   */
  right: z.number(),

  /**
   * The frame's offset from the bottom.
   */
  bottom: z.number(),

  /**
   * The frame's offset from the left.
   */
  left: z.number()
})

const SizeClassSchema = z.enum(["compact", "regular", "unspecified"])

const SizeClassesSchema = z.object({
  /**
   * The horizontal size class.
   */
  horizontal: SizeClassSchema,

  /**
   * The vertical size class.
   */
  vertical: SizeClassSchema
})

const OrientationSchema = z.enum(["portrait", "landscape"])

const OrientedDimensionsSchema = z.object({
  /**
   * The layout margins frame.
   */
  layoutMargins: FrameSchema,

  /**
   * The readable content frame.
   */
  readableContent: FrameSchema,

  /**
   * The safe area frame.
   */
  safeArea: FrameSchema,

  /**
   * The device's screen.
   */
  screen: ScreenSchema,

  /**
   * The horizontal and vertical size classes.
   */
  sizeClass: SizeClassesSchema
})

export const DimensionsSchema = TraitsSchema.extend({
  /**
   * The device's dimensions in portrait.
   */
  portrait: OrientedDimensionsSchema,

  /**
   * The device's dimensions in landscape.
   */
  landscape: OrientedDimensionsSchema
})

export type Device = z.infer<typeof DeviceSchema>
export type Traits = z.infer<typeof TraitsSchema>
export type Screen = z.infer<typeof ScreenSchema>
export type Frame = z.infer<typeof FrameSchema>
export type SizeClass = z.infer<typeof SizeClassSchema>
export type SizeClasses = z.infer<typeof SizeClassesSchema>
export type Orientation = z.infer<typeof OrientationSchema>
export type OrientedDimensions = z.infer<typeof OrientedDimensionsSchema>
export type Dimensions = z.infer<typeof DimensionsSchema>

export interface SimulatorDimensions extends OrientedDimensions, Traits {
  /**
   * The device's orientation.
   */
  orientation: Orientation
}
