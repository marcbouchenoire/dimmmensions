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
      <a
        aria-label="GitHub"
        className={styles.github}
        href="https://github.com/bouchenoiremarc/ios-dimensions"
        rel="noreferrer"
        target="_blank"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 12c0 9.5-1.02 11.6-8.75 11.94v-4.1c0-1.2-.43-1.97-.9-2.37 2.9-.32 5.94-1.4 5.94-6.32 0-1.4-.5-2.55-1.33-3.44.13-.33.58-1.63-.13-3.4 0 0-1.1-.34-3.57 1.32a12.67 12.67 0 00-6.51 0C6.26 3.97 5.17 4.32 5.17 4.32a4.55 4.55 0 00-.13 3.39 4.92 4.92 0 00-1.34 3.44c0 4.9 3.04 6 5.93 6.33a2.7 2.7 0 00-.83 1.71c-.74.33-2.62.9-3.78-1.06 0 0-.69-1.23-2-1.32h-.01c-.16 0-1.17.04-.07.78 0 0 .85.4 1.44 1.87 0 0 .75 2.3 4.37 1.52v2.96C1.1 23.6.02 21.55 0 12.34V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </a>
    </div>
  )
}

export default Page
