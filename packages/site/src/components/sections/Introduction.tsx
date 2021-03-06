import clsx from "clsx"
import { Transition, Variants, motion } from "framer-motion"
import { ComponentProps } from "react"
import { useCopy } from "../../hooks/use-copy"
import { springier } from "../../transitions"

interface Props extends ComponentProps<"section"> {
  /**
   * The README list of features formatted as HTML.
   */
  features: string
}

const NPM_INSTALL = "npm i dimmmensions"

const clipboardTransition: Transition = {
  default: {
    ...springier,
    delay: 0.1
  },
  opacity: {
    type: "spring",
    duration: springier.duration,
    bounce: 0
  }
}

const clipboardVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1
  }
}

/**
 * A section introducing the library.
 *
 * @param props - A set of `section` props.
 * @param props.features - The README list of features formatted as HTML.
 * @param [props.className] - A list of one or more classes.
 */
export function Introduction({ features, className, ...props }: Props) {
  const [clipboardCopied, handleClipboardClick] = useCopy(NPM_INSTALL)

  return (
    <section className={clsx(className, "mt-16 md:mt-20 lg:mt-28")} {...props}>
      <h1 className="logo text-4xl font-bold md:text-5xl">
        <img alt="Dimmmensions" height="80" src="/logo.svg" width="652" />
      </h1>
      <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300 md:text-xl">
        A collection of dimensions from iOS and iPadOS devices.
      </p>
      <div
        className="prose prose-zinc prose-primary dark:prose-invert mt-6"
        dangerouslySetInnerHTML={{ __html: features }}
      />
      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <a
          className="dark:hover:bg-primary-400/80 hover:bg-primary-500/80 hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10 flex w-full flex-none cursor-pointer items-center justify-center gap-2 rounded-md py-2 px-3 pl-2.5 font-medium text-white shadow-lg transition selection:bg-white/30 dark:text-zinc-900 dark:selection:bg-zinc-900/30 sm:w-auto"
          href="https://github.com/marcbouchenoire/dimmmensions"
          rel="noreferrer"
          target="_blank"
        >
          <svg
            height="24"
            role="presentation"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M12 2C6.475 2 2 6.47 2 11.988c0 4.42 2.862 8.153 6.838 9.476.5.087.687-.212.687-.474 0-.238-.013-1.024-.013-1.86C7 19.59 6.35 18.517 6.15 17.955c-.113-.287-.6-1.174-1.025-1.411-.35-.187-.85-.65-.013-.662.788-.012 1.35.724 1.538 1.024.9 1.51 2.338 1.086 2.912.824.088-.65.35-1.086.638-1.336-2.225-.25-4.55-1.111-4.55-4.931 0-1.087.387-1.986 1.025-2.685-.1-.25-.45-1.273.1-2.646 0 0 .837-.263 2.75 1.023a9.29 9.29 0 0 1 2.5-.337c.85 0 1.7.113 2.5.337 1.912-1.298 2.75-1.023 2.75-1.023.55 1.373.2 2.397.1 2.646.637.7 1.025 1.586 1.025 2.685 0 3.832-2.337 4.681-4.562 4.931.362.312.675.912.675 1.848 0 1.336-.013 2.41-.013 2.747 0 .262.188.574.688.474C19.137 20.141 22 16.395 22 11.988 22 6.47 17.525 2 12 2Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <span>View on GitHub</span>
        </a>
        <button
          className="hover:bg-primary-500/20 dark:hover:bg-primary-400/30 focusable text-primary-500 bg-primary-500/10 dark:bg-primary-400/20 dark:text-primary-400 group flex w-full flex-none cursor-pointer items-center justify-center gap-2 rounded-md py-2 px-2.5 font-mono text-sm transition sm:w-auto"
          onClick={handleClipboardClick}
          type="button"
        >
          <svg
            className="flex-none"
            height="24"
            role="presentation"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M4.003 17.99A2 2 0 0 0 6 19.992l4.999.007a1 1 0 0 0 1.001-1V9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v10a1 1 0 0 0 1 1h.991a2 2 0 0 0 2-1.999l.008-11.982A2 2 0 0 0 18 4.018l-11.98-.015A2 2 0 0 0 4.018 6l-.015 11.99Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <span className="truncate">{NPM_INSTALL}</span>
          <svg
            className="flex-none opacity-30 dark:opacity-50"
            height="24"
            role="presentation"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipRule="evenodd" fill="currentColor" fillRule="evenodd">
              <path d="M3 6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3 1 1 0 1 1-2 0 1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1 1 1 0 1 1 0 2 3 3 0 0 1-3-3V6Z" />
              <path d="M9 12a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3v-6Z" />
            </g>
            <motion.path
              animate={clipboardCopied ? "visible" : "hidden"}
              className="stroke-white dark:stroke-zinc-800"
              d="M12 15.222 13.846 17 18 13"
              fill="none"
              initial="hidden"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              transition={clipboardTransition}
              variants={clipboardVariants}
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
