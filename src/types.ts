export type Dimensions = Record<Orientation, OrientedDimensions> & Traits

export interface OrientedDimensions {
  screen: Screen
  sizeClass: SizeClasses
  safeArea: Frame
  layoutMargins: Frame
  readableContent: Frame
}

export interface ExtractedDimensions extends OrientedDimensions, Traits {
  orientation: Orientation
}

export interface Traits {
  device: Device
  scale: number
  radius: number
}

export type Device = "iPhone" | "iPad"

export type Orientation = "portrait" | "landscape"

export type SizeClass = "unspecified" | "compact" | "regular"

export interface Screen {
  width: number
  height: number
}

export interface SizeClasses {
  horizontal: SizeClass
  vertical: SizeClass
}

export interface Frame {
  top: number
  right: number
  bottom: number
  left: number
}
