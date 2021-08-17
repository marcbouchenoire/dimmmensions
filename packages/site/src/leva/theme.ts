import { Leva } from "leva"
import { ComponentProps } from "react"

type Theme = ComponentProps<typeof Leva>["theme"]

export const theme: Theme = {
  colors: {
    accent1: "#e8e8e8",
    accent2: "$accent1",
    accent3: "$accent1",
    elevation1: "#f3f3f3",
    elevation2: "#fff",
    elevation3: "$elevation1",
    highlight1: "#999",
    highlight2: "#666",
    highlight3: "#333",
    vivid1: "$accent1"
  },
  radii: { sm: "5px" },
  shadows: {
    level1:
      "0px 4px 10px rgba(0, 0, 0, 0.06), 0px 20px 26px  rgba(0, 0, 0, 0.02)",
    level2:
      "0px 12px 18px rgba(0, 0, 0, 0.06), 0px 28px 36px rgba(0, 0, 0, 0.04)"
  },
  sizes: {
    rootWidth: "320px",
    rowHeight: "26px"
  },
  space: {
    colGap: "$sm",
    md: "$sm",
    rowGap: "$sm",
    sm: "10px"
  }
}
