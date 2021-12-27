export type Dimensions = Record<Orientation, OrientedDimensions> & Traits

export interface OrientedDimensions {
  /**
   * The layout margins frame.
   */
  layoutMargins: Frame

  /**
   * The readable content frame.
   */
  readableContent: Frame

  /**
   * The safe area frame.
   */
  safeArea: Frame

  /**
   * The device's screen.
   */
  screen: Screen

  /**
   * The horizontal and vertical size classes.
   */
  sizeClass: SizeClasses
}

export interface SimulatorDimensions extends OrientedDimensions, Traits {
  /**
   * The device's orientation.
   */
  orientation: Orientation
}

export interface Traits {
  /**
   * The device's type.
   */
  device: Device

  /**
   * The device's name.
   */
  name: string

  /**
   * The screen's corner radius.
   */
  radius: number

  /**
   * The screen's scale.
   */
  scale: number
}

export type Device = "iPad" | "iPhone"

export type Orientation = "landscape" | "portrait"

export type SizeClass = "compact" | "regular" | "unspecified"

export interface Screen {
  /**
   * The screen's height.
   */
  height: number

  /**
   * The screen's width.
   */
  width: number
}

export interface SizeClasses {
  /**
   * The horizontal size class.
   */
  horizontal: SizeClass

  /**
   * The vertical size class.
   */
  vertical: SizeClass
}

export interface Frame {
  /**
   * The frame's offset from the bottom.
   */
  bottom: number

  /**
   * The frame's offset from the left.
   */
  left: number

  /**
   * The frame's offset from the right.
   */
  right: number

  /**
   * The frame's offset from the top.
   */
  top: number
}
