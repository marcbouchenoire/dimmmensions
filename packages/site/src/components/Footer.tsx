import clsx from "clsx"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"footer"> {
  date: string
}

export function Footer({ className, date, ...props }: Props) {
  return (
    <footer
      className={clsx(
        "font-medium text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props}
    >
      <span className="whitespace-pre">
        © <span className="hidden sm:inline">{date} </span>
        <span className="text-zinc-300 dark:text-zinc-600">—</span>{" "}
      </span>
      <a
        className="link"
        href="https://github.com/marcbouchenoire/dimmmensions/blob/main/LICENSE"
      >
        MIT License
      </a>
      <div className="ml-auto">
        <span className="hidden sm:inline">Made by </span>
        <a className="link" href="https://marcbouchenoire.com/">
          Marc Bouchenoire
        </a>
      </div>
    </footer>
  )
}
