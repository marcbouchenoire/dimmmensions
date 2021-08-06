export type Dimensions = Record<Orientation, OrientedDimensions> & Traits

export interface OrientedDimensions {
  layoutMargins: Frame
  readableContent: Frame
  safeArea: Frame
  screen: Screen
  sizeClass: SizeClasses
}

export interface ExtractedDimensions extends OrientedDimensions, Traits {
  orientation: Orientation
}

export interface Traits {
  device: Device
  radius: number
  scale: number
}

export type Device = "iPad" | "iPhone"

export type Orientation = "landscape" | "portrait"

export type SizeClass = "compact" | "regular" | "unspecified"

export interface Screen {
  height: number
  width: number
}

export interface SizeClasses {
  horizontal: SizeClass
  vertical: SizeClass
}

export interface Frame {
  bottom: number
  left: number
  right: number
  top: number
}
