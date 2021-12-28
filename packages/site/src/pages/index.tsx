import { readFile } from "fs/promises"
import { GetStaticProps } from "next"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrism from "rehype-prism-plus"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import pkg from "../../../dimmmensions/package.json"
import { Dimensions } from "../components/Dimensions"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import rehypeRemoveImages from "../plugins/rehype/remove-images"
import remarkFilterHeadings from "../plugins/remark/filter-headings"
import remarkFindNode from "../plugins/remark/find-node"

interface Props {
  /**
   * The filtered README content formatted as HTML.
   */
  content: string

  /**
   * The current year.
   */
  date: string

  /**
   * The README list of features formatted as HTML.
   */
  features: string

  /**
   * The latest package version.
   */
  version: string
}

/**
 * The index page component.
 *
 * @param props - A set of props.
 * @param props.date - The current year.
 * @param props.content - The filtered README content formatted as HTML.
 * @param props.features - The README list of features formatted as HTML.
 * @param props.version - The latest package version.
 */
function Page({ date, content, features, version }: Props) {
  return (
    <>
      <div className="overflow-hidden absolute top-0 w-screen h-72 pointer-events-none md:h-80 lg:h-96">
        <div className="relative h-full content">
          <div className="absolute left-[-100%] w-[300%] h-full opacity-30 md:left-[-150%] md:w-[400%] aura z-negative" />
        </div>
      </div>
      <Header
        className="pt-5 md:pt-6 lg:pt-8 content"
        features={features}
        version={version}
      />
      <Dimensions className="my-10 md:my-16 lg:my-20 content-lg" />
      <article
        className="my-10 prose md:my-16 lg:my-20 content prose-zinc dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="content">
        <hr className="w-full border-t dark:border-zinc-800 border-zinc-150" />
      </div>
      <Footer
        className="flex items-center my-8 md:my-10 lg:my-12 content pb-0-safe"
        date={date}
      />
    </>
  )
}

export default Page

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = await readFile("../../packages/dimmmensions/README.md")
  const processor = unified().use(remarkParse)

  const features = await processor()
    .use(remarkFindNode, "list")
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(file)

  const content = await processor()
    .use(remarkFilterHeadings, { exclude: [{ depth: 1 }] })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeRemoveImages)
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { content: [] })
    .use(rehypeStringify)
    .process(file)

  return {
    props: {
      version: pkg.version,
      date: String(new Date().getFullYear()),
      content: String(content.value),
      features: String(features.value)
    }
  }
}
