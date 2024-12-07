import { remark } from 'remark'
import rehype from 'remark-rehype'
import html from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { rehypeVideo } from './rehype-video'

export const processContent = async (
  date: string,
  content: string,
  options?: {
    useShiki?: boolean
    useHeadings?: boolean
  },
) => {
  const contentWithoutDataview = content
    .replace(/```dataview[\s\S]*?```/g, '')
    .replace(/\n/g, '  \n')

  const contentWithReplacedImages = contentWithoutDataview.replace(
    /!\[\[(.*?)\.(jpg|png|jpeg|mp4)(?:\|(\d+))?\]\]/g,
    (_, name, ext) => {
      return `![${name}.${ext}](https://pub-b6229d3c7a914a1a8a4e5f22934aec67.r2.dev/${new Date(date).getFullYear()}/${name}.${ext})`
    },
  )

  const processor = remark()
    .use(rehype)
    .use(remarkGfm)
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['nofollow', 'noopener', 'noreferrer'],
    })
    .use(remarkMath)
    .use(rehypeKatex)
    .use(rehypeVideo)

  if (options?.useShiki) {
    const rehypeShiki = (await import('@shikijs/rehype')).default
    processor.use(rehypeShiki, {
      themes: {
        light: 'min-light',
        dark: 'material-theme-darker',
      },
    })
  }

  if (options?.useHeadings) {
    const rehypeSlug = (await import('rehype-slug')).default
    const rehypeAutolinkHeadings = (await import('rehype-autolink-headings'))
      .default
    const { h } = await import('hastscript')

    processor.use(rehypeSlug).use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { class: 'head-anchor' },
      content: h('span', '#'),
    })
  }

  processor.use(html)
  const processedContent = await processor.process(contentWithReplacedImages)
  return processedContent.toString()
}
