import clsx from "clsx"
import { Leva, LevaInputs, button, useControls } from "leva"
import { GetStaticProps } from "next"
import { CSSProperties } from "react"
import pkg from "../../../ios-dimensions/package.json"
import { Screen } from "../components/Screen"
import { LEVA_MARGIN, LEVA_WIDTH } from "../constants"
import { theme } from "../leva/theme"
import { Orientation } from "../types"
import { getDimensions } from "../utils/get-dimensions"
import styles from "./index.module.scss"

interface Props {
  version: string
}

const APPEARANCE_FOLDER = "Appearance"

const attributedDimensions = getDimensions()

const orientations = {
  Portrait: "portrait",
  Landscape: "landscape"
}

const DEFAULT_ORIENTATION = orientations.Portrait
const DEFAULT_COLOR_SAFE_AREA = "#85f"
const DEFAULT_COLOR_LAYOUT_MARGINS = "#0bf"
const DEFAULT_COLOR_READABLE_CONTENT = "#9c2"

function Page({ version }: Props) {
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
      value: DEFAULT_ORIENTATION
    }
  })
  const [{ safeArea }, setSafeArea] = useControls(APPEARANCE_FOLDER, () => ({
    safeArea: {
      label: "Safe Area",
      type: LevaInputs.COLOR,
      value: DEFAULT_COLOR_SAFE_AREA
    }
  }))
  const [{ layoutMargins }, setLayoutMargins] = useControls(
    APPEARANCE_FOLDER,
    () => ({
      layoutMargins: {
        label: "Layout Margins",
        type: LevaInputs.COLOR,
        value: DEFAULT_COLOR_LAYOUT_MARGINS
      }
    })
  )
  const [{ readableContent }, setReadableContent] = useControls(
    APPEARANCE_FOLDER,
    () => ({
      readableContent: {
        label: "Readable Content",
        type: LevaInputs.COLOR,
        value: DEFAULT_COLOR_READABLE_CONTENT
      }
    })
  )
  useControls(APPEARANCE_FOLDER, {
    Reset: button(() => {
      setSafeArea({
        safeArea: DEFAULT_COLOR_SAFE_AREA
      })
      setLayoutMargins({
        layoutMargins: DEFAULT_COLOR_LAYOUT_MARGINS
      })
      setReadableContent({
        readableContent: DEFAULT_COLOR_READABLE_CONTENT
      })
    })
  })

  return (
    <div
      className={styles.page}
      style={
        {
          "--leva-margin": `${LEVA_MARGIN}px`,
          "--leva-width": `${LEVA_WIDTH}px`
        } as CSSProperties
      }
    >
      <Leva theme={theme} titleBar={false} />
      <header className={styles.header}>
        <div className={styles.headings}>
          <h1>
            ios-dimensions{" "}
            <a
              className={styles.version}
              href={`https://github.com/bouchenoiremarc/ios-dimensions/releases/tag/v${version}`}
              rel="noreferrer"
              target="_blank"
            >
              v{version}
            </a>
          </h1>
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
                    d="M24 12c0 10.7-1.3 12-12 12C1.4 24 .03 22.73 0 12.33V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12zM6.02 6L6 18h6V9h3v9h3V6.02L6.02 6z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="twitter"
                className={clsx(styles.link, styles.twitter)}
                href="https://twitter.com/bouchenoiremarc"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 12c0 10.7-1.3 12-12 12C1.4 24 .03 22.73 0 12.33V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12zm-6.22-5.33a3.29 3.29 0 00-4.03-.8 3.14 3.14 0 00-1.57 3.73 9.5 9.5 0 01-6.82-3.4 3.26 3.26 0 00.87 4.25c-.46.01-.92-.07-1.35-.24a3.33 3.33 0 002.75 3.13c-.48.14-1 .17-1.5.09a3.37 3.37 0 002.8 2.22 6.97 6.97 0 01-4.68 1.42 9.6 9.6 0 009.8.17A9.17 9.17 0 0018.7 8.8a3.1 3.1 0 001.55-1.66c-.6.28-1.23.46-1.89.52a3.09 3.09 0 001.5-1.8c-.63.4-1.33.68-2.08.8z"
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
        <Screen
          colors={{ layoutMargins, readableContent, safeArea }}
          dimensions={dimensions}
          orientation={orientation as Orientation}
        />
      </main>
    </div>
  )
}

export default Page

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      version: pkg.version ?? ""
    }
  }
}
