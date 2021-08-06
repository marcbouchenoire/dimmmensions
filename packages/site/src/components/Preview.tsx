import clsx from "clsx"
import { AnimatePresence, motion, Spring, Variants } from "framer-motion"
import { Dimensions } from "ios-dimensions"
import { ComponentPropsWithoutRef, CSSProperties, useMemo } from "react"
import { Orientation } from "../types"
import styles from "./Preview.module.scss"

const OPACITY = 0.5
const PATTERN_SIZE = 8
const PATTERN_OPACITY = 0.2
const SCREEN: Frame = { bottom: 0, left: 0, right: 0, top: 0 }
const EDGES: Edge[] = ["top", "right", "bottom", "left"]

interface Frame {
  bottom: number
  left: number
  right: number
  top: number
}

type Edge = keyof Frame

interface Colors {
  layoutMargins: string
  readableContent: string
  safeArea: string
}

interface Props extends ComponentPropsWithoutRef<"div"> {
  colors: Colors
  dimensions: Dimensions
  orientation: Orientation
}

function getPathFromFrame(frame: Frame, width: number, height: number) {
  return `M ${frame.left} ${frame.top}
          V ${height - frame.bottom}
          H ${width - frame.right}
          V ${frame.top} Z`
}

function getPathFromEdge(
  frame: Frame,
  edge: Edge,
  width: number,
  height: number
) {
  return `M ${edge === "right" ? width - frame.right : frame.left}
            ${edge === "bottom" ? height - frame.bottom : frame.top}
          ${
            edge === "top" || edge === "bottom"
              ? `H ${width - frame.right}`
              : `V ${height - frame.bottom}`
          }`
}

function normalizeDimensions(
  width: number,
  height: number,
  reference: Frame,
  bounds: Frame = SCREEN
) {
  if (
    reference.top === bounds.top &&
    reference.right === bounds.right &&
    reference.bottom === bounds.bottom &&
    reference.left === bounds.left
  ) {
    return null
  }

  return {
    edges: EDGES.map((edge) => {
      return reference[edge] !== bounds[edge]
        ? getPathFromEdge(reference, edge, width, height)
        : null
    }),
    frame: `${getPathFromFrame(reference, width, height)}
          ${getPathFromFrame(bounds, width, height)}`
  }
}

const transition: Spring = { bounce: 0, duration: 0.6, type: "spring" }

const variants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: OPACITY
  }
}

export function Preview({
  className,
  dimensions,
  orientation,
  colors,
  ...props
}: Props) {
  const { screen, ...dimensionsWithOrientation } = useMemo(
    () => dimensions[orientation],
    [dimensions, orientation]
  )
  const { width, height, ratio } = useMemo(() => {
    const width = screen.width
    const height = screen.height
    const ratio = width / height

    return { height, ratio, width }
  }, [screen])
  const dimensionsWithColors = useMemo(
    () => [
      {
        color: colors.safeArea,
        ...normalizeDimensions(
          width,
          height,
          dimensionsWithOrientation.safeArea
        )
      },
      {
        color: colors.layoutMargins,
        ...normalizeDimensions(
          width,
          height,
          dimensionsWithOrientation.layoutMargins,
          dimensionsWithOrientation.safeArea
        )
      },
      {
        color: colors.readableContent,
        ...normalizeDimensions(
          width,
          height,
          dimensionsWithOrientation.readableContent,
          dimensionsWithOrientation.layoutMargins
        )
      }
    ],
    [colors, width, height, dimensionsWithOrientation]
  )

  return (
    <div
      className={clsx(className, styles.container)}
      style={
        {
          "--height": `${height}px`,
          "--ratio": ratio,
          "--width": `${width}px`
        } as CSSProperties
      }
      {...props}
    >
      <motion.div
        className={styles.preview}
        layout
        transition={{ ...transition, bounce: 0.1 }}
      >
        <AnimatePresence initial={false}>
          <motion.svg
            animate="visible"
            exit="hidden"
            height="100%"
            initial="hidden"
            key={`${screen.width}.${screen.height}`}
            preserveAspectRatio="none"
            transition={transition}
            variants={variants}
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
          >
            <defs>
              {dimensionsWithColors.map(({ color }, index) => (
                <pattern
                  height={PATTERN_SIZE}
                  id={`${index}`}
                  key={`pattern-${index}`}
                  patternTransform="rotate(45)"
                  patternUnits="userSpaceOnUse"
                  width={PATTERN_SIZE * (index ? index * 2 : 1)}
                >
                  <line stroke={color} strokeWidth={2} y2={PATTERN_SIZE} />
                </pattern>
              ))}
            </defs>
            {dimensionsWithColors.map(({ frame, color }, index) => {
              if (!frame) return null

              return (
                <g fillRule="evenodd" key={`fill-${index}`}>
                  <path
                    d={frame}
                    fill={color}
                    style={{ opacity: PATTERN_OPACITY }}
                  />
                  <path d={frame} fill={`url(#${index})`} />
                </g>
              )
            })}
            {dimensionsWithColors.reverse().map(({ edges, color }) => {
              if (!edges) return null

              return edges.map(
                (frame, index) =>
                  frame && (
                    <path
                      d={frame}
                      fillRule="evenodd"
                      key={`stroke-${index}`}
                      stroke={color}
                      strokeLinecap="square"
                      strokeWidth={1}
                    />
                  )
              )
            })}
          </motion.svg>
        </AnimatePresence>
      </motion.div>
      <motion.div
        className={styles.toast}
        layout="position"
        transition={{ ...transition, bounce: 0.1 }}
      >
        <div className={styles.group}>
          <span className={styles.secondaryLabel}>@</span>
          <span className={styles.label}>{dimensions.scale}x</span>
        </div>
        <div className={styles.group}>
          <span className={styles.label}>{dimensions.radius}</span>
          <span className={styles.secondaryLabel}>pt</span>
        </div>
        <div className={clsx(styles.group, styles.sizeClasses)}>
          <div className={styles.sizeClass}>
            <span className={styles.secondaryLabel}>w</span>
            <span className={styles.label}>
              {dimensionsWithOrientation.sizeClass.horizontal.charAt(0)}
            </span>
          </div>
          <div className={styles.sizeClass}>
            <span className={styles.secondaryLabel}>h</span>
            <span className={styles.label}>
              {dimensionsWithOrientation.sizeClass.vertical.charAt(0)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
