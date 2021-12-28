export interface Data {
  /**
   * The current year.
   */
  date: string

  /**
   * The latest package version.
   */
  version: string
}

export type Intersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export type Tuples<T> = { [P in keyof T]: T[P] } extends {
  [key: number]: infer V
}
  ? V
  : never
