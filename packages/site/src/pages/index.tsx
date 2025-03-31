import { readFile } from "fs/promises"
import type { GetStaticProps } from "next"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrism from "rehype-prism-plus"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import type { Plugin } from "unified"
import { unified } from "unified"
import type { Parent } from "unist"
import type { Text } from "mdast"
import { Dimensions } from "../components/sections/Dimensions"
import { Introduction } from "../components/sections/Introduction"
import rehypeRemoveImages from "../plugins/rehype/remove-images"
import remarkFilterHeadings from "../plugins/remark/filter-headings"
import remarkFindNode from "../plugins/remark/find-node"

const BLOCKQUOTE_ALERTS_REGEX = /\[\![A-Z]+\]/g

interface Props {
  /**
   * The filtered README content formatted as HTML.
   */
  content: string

  /**
   * The README list of features formatted as HTML.
   */
  features: string
}

/**
 * The index page component.
 *
 * @param props - A set of props.
 * @param props.content - The filtered README content formatted as HTML.
 * @param props.features - The README list of features formatted as HTML.
 */
function Page({ content, features }: Props) {
  return (
    <main>
      <Introduction className="content" features={features} />
      <Dimensions className="content-lg my-10 md:my-16 lg:my-20" />
      <article
        className="prose content prose-zinc dark:prose-invert mb-10 md:mb-16 lg:mb-20"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  )
}

export default Page

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = await readFile("../../packages/dimmmensions/README.md")
  const processor = unified().use(remarkParse as Plugin)

  const features = await processor()
    .use(remarkFindNode, "list")
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify as Plugin)
    .process(file)

  const content = await processor()
    .use(() => {
      return (tree) => {
        ;(tree as Parent).children = (tree as Parent).children.filter(
          (node) => {
            if (node.type === "blockquote") {
              const paragraph = (node as Parent).children[0] as
                | Parent
                | undefined

              if (
                paragraph?.type === "paragraph" &&
                paragraph.children[0]?.type === "text"
              ) {
                const text = paragraph.children[0] as Text | undefined

                if (text?.value.match(BLOCKQUOTE_ALERTS_REGEX)) {
                  return false
                }
              }
            }

            return true
          }
        )
      }
    })
    .use(remarkFilterHeadings, { exclude: [{ depth: 1 }] })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeRemoveImages)
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { content: [] })
    .use(rehypeStringify as Plugin)
    .process(file)

  return {
    props: {
      content: String(content.value),
      features: String(features.value)
    }
  }
}
