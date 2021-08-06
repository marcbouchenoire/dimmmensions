import { useControls, Leva, LevaInputs, button } from "leva"
import { Preview } from "../components/Preview"
import { theme } from "../leva/theme"
import { Orientation } from "../types"
import { getDimensions } from "../utils/getDimensions"
import styles from "./index.module.scss"

const APPEARANCE_FOLDER = "Appearance"
const COLOR_SAFE_AREA = "#85f"
const COLOR_LAYOUT_MARGINS = "#0bf"
const COLOR_READABLE_CONTENT = "#9c2"

/* eslint-disable sort-keys-fix/sort-keys-fix */
const orientationOptions = {
  Portrait: "portrait",
  Landscape: "landscape"
}
/* eslint-enable sort-keys-fix/sort-keys-fix */

function Page() {
  const { dimensions } = useControls({
    dimensions: {
      label: "Device",
      options: getDimensions(),
      type: LevaInputs.SELECT
    }
  })
  const { orientation } = useControls({
    orientation: {
      label: "Orientation",
      options: orientationOptions,
      type: LevaInputs.SELECT,
      value: "portrait"
    }
  })
  const [{ safeArea }, setSafeArea] = useControls(APPEARANCE_FOLDER, () => ({
    safeArea: {
      label: "Safe Area",
      type: LevaInputs.COLOR,
      value: COLOR_SAFE_AREA
    }
  }))
  const [{ layoutMargins }, setLayoutMargins] = useControls(
    APPEARANCE_FOLDER,
    () => ({
      layoutMargins: {
        label: "Layout Margins",
        type: LevaInputs.COLOR,
        value: COLOR_LAYOUT_MARGINS
      }
    })
  )
  const [{ readableContent }, setReadableContent] = useControls(
    APPEARANCE_FOLDER,
    () => ({
      readableContent: {
        label: "Readable Content",
        type: LevaInputs.COLOR,
        value: COLOR_READABLE_CONTENT
      }
    })
  )
  useControls(APPEARANCE_FOLDER, {
    Reset: button(() => {
      setSafeArea({
        safeArea: COLOR_SAFE_AREA
      })
      setLayoutMargins({
        layoutMargins: COLOR_LAYOUT_MARGINS
      })
      setReadableContent({
        readableContent: COLOR_READABLE_CONTENT
      })
    })
  })

  return (
    <div className={styles.page}>
      <Leva theme={theme} titleBar={false} />
      <Preview
        colors={{ layoutMargins, readableContent, safeArea }}
        dimensions={dimensions}
        orientation={orientation as Orientation}
      />
    </div>
  )
}

export default Page
