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
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Playground } from "../components/Playground"
import rehypeRemoveImages from "../plugins/rehype/remove-images"
import remarkFilterHeadings from "../plugins/remark/filter-headings"
import remarkFindNode from "../plugins/remark/find-node"

interface Props {
  content: string
  date: string
  features: string
}

function Page({ date, content, features }: Props) {
  return (
    <>
      <Header
        className="pt-5 md:pt-6 lg:pt-8 mx-auto mb-5 md:mb-6 lg:mb-8 max-w-screen-sm px-5-safe"
        features={features}
      />
      <Playground className="my-10 md:my-16 lg:my-20 mx-auto max-w-screen-lg px-5-safe" />
      <article
        className="my-10 md:my-16 lg:my-20 mx-auto max-w-screen-sm prose px-5-safe prose-zinc dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="mx-auto max-w-screen-sm px-5-safe">
        <hr className="w-full border-t border-zinc-150 dark:border-zinc-800" />
      </div>
      <Footer
        className="flex items-center my-8 md:my-10 lg:my-12 mx-auto max-w-screen-sm px-5-safe"
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
      date: String(new Date().getFullYear()),
      content: String(content.value),
      features: String(features.value)
    }
  }
}
