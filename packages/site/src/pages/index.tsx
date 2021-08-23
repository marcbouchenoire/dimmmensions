import clsx from "clsx"
import { useControls, Leva, LevaInputs, button } from "leva"
import { CSSProperties } from "react"
import { Preview } from "../components/Preview"
import { HEADER_HEIGHT, LEVA_MARGIN, LEVA_WIDTH } from "../constants"
import { theme } from "../leva/theme"
import { Orientation } from "../types"
import { getDimensions } from "../utils/get-dimensions"
import styles from "./index.module.scss"

const APPEARANCE_FOLDER = "Appearance"
const COLOR_SAFE_AREA = "#85f"
const COLOR_LAYOUT_MARGINS = "#0bf"
const COLOR_READABLE_CONTENT = "#9c2"

const attributedDimensions = getDimensions()

/* eslint-disable sort-keys-fix/sort-keys-fix */
const orientations = {
  Portrait: "portrait",
  Landscape: "landscape"
}
/* eslint-enable sort-keys-fix/sort-keys-fix */

function Page() {
  const { dimensions } = useControls({
    dimensions: {
      label: "Device",
      options: attributedDimensions,
      type: LevaInputs.SELECT
    }
  })
  const { orientation } = useControls({
    orientation: {
      label: "Orientation",
      options: orientations,
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
    <div
      className={styles.page}
      style={
        {
          "--header-height": `${HEADER_HEIGHT}px`,
          "--leva-margin": `${LEVA_MARGIN}px`,
          "--leva-width": `${LEVA_WIDTH}px`
        } as CSSProperties
      }
    >
      <header className={styles.header}>
        <div className={styles.headings}>
          <h1>ios-dimensions</h1>
          <p>📏 A collection of dimensions from iOS.</p>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <a
                aria-label="GitHub"
                className={clsx(styles.link, styles.github)}
                href="https://github.com/bouchenoiremarc/ios-dimensions"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 12c0 9.53-1.03 11.6-8.8 11.94v-4.13c0-1.14-.4-1.88-.85-2.26 2.76-.3 5.65-1.33 5.65-6.02 0-1.33-.48-2.42-1.27-3.27.12-.31.55-1.55-.13-3.23 0 0-1.03-.33-3.4 1.25a12.06 12.06 0 00-6.2 0C6.65 4.7 5.6 5.03 5.6 5.03a4.33 4.33 0 00-.12 3.23 4.68 4.68 0 00-1.27 3.27c0 4.67 2.89 5.72 5.64 6.03-.36.3-.68.84-.79 1.63-.7.31-2.5.85-3.6-1.01 0 0-.65-1.17-1.9-1.26h-.02c-.15 0-1.1.04-.06.74 0 0 .8.38 1.37 1.79 0 0 .72 2.17 4.16 1.44v3.06C1.14 23.65.03 21.65 0 12.33V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="npm"
                className={clsx(styles.link, styles.npm)}
                href="https://www.npmjs.com/package/ios-dimensions"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 12c0 10.7-1.3 12-12 12C1.4 24 .03 22.73 0 12.33V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12zM5.02 5L5 19h7V8.5h3.5V19H19V5.02L5.02 5z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Leva theme={theme} titleBar={false} />
        <Preview
          colors={{ layoutMargins, readableContent, safeArea }}
          dimensions={dimensions}
          orientation={orientation as Orientation}
        />
      </main>
    </div>
  )
}

export default Page
