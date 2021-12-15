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
      <div className="overflow-hidden absolute top-0 w-screen h-72 md:h-80 lg:h-96 pointer-events-none">
        <div className="relative h-full content">
          <div className="absolute h-full opacity-30 aura w-[300%] md:w-[400%] left-[-100%] md:left-[-150%] z-negative" />
        </div>
      </div>
      <Header className="pt-5 md:pt-6 lg:pt-8 content" features={features} />
      <Playground className="my-10 md:my-16 lg:my-20 content-lg" />
      <article
        className="my-10 md:my-16 lg:my-20 prose content prose-zinc dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="content">
        <hr className="w-full border-t border-zinc-150 dark:border-zinc-800" />
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
      date: String(new Date().getFullYear()),
      content: String(content.value),
      features: String(features.value)
    }
  }
}
