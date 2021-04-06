export interface Dimensions extends Record<Orientation, OrientedDimensions> {
  scale: number
}

export interface OrientedDimensions {
  screen: Screen
  sizeClass: SizeClasses
  safeArea: Frame
  layoutMargins: Frame
  readableContent: Frame
}

export interface ExtractedDimensions extends OrientedDimensions {
  orientation: Orientation
  scale: number
}

type Orientation = "portrait" | "landscape"

type SizeClass = "unspecified" | "compact" | "regular"

interface Screen {
  width: number
  height: number
}

interface SizeClasses {
  horizontal: SizeClass
  vertical: SizeClass
}

interface Frame {
  top: number
  right: number
  bottom: number
  left: number
}
