import { remark } from 'remark'
import rehype from 'remark-rehype'
import html from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { rehypeVideo } from './rehype-video'
import rehypeRaw from 'rehype-raw'
import remarkRehype from 'remark-rehype'

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
    (_, name, ext, width) => {
      const url = `https://img.liuzhch1.com/${new Date(date).getFullYear()}/${name}.${ext}`
      return width
        ? `<img src="${url}" alt="${name}.${ext}" width="${width}px" />`
        : `<img src="${url}" alt="${name}.${ext}" />`
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
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
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
