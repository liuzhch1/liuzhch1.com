import Head from 'next/head'
import { remark } from 'remark'
import rehype from 'remark-rehype'
import html from 'rehype-stringify'
import { getAllPosts } from '@/utils/posts'
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { h } from 'hastscript'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Giscus } from '@/components/Giscus'
import { formatDate } from '@/utils'

interface PostProps {
  title: string
  date: string
  tags: string[]
  contentHtml: string
}

export default function Post({ title, date, tags, contentHtml }: PostProps) {
  return (
    <>
      <Head>
        <title>{title} | Joey's Blog</title>
      </Head>
      <h1 className="text-3xl mb-0">{title}</h1>
      <time className="text-sm text-gray-500">
        {formatDate({ date, time: tags.includes('moment') })}
      </time>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <div className="mt-16">
        <Giscus />
      </div>
    </>
  )
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] }
}) {
  const slug = params.slug.join('/')

  try {
    const posts = getAllPosts().filter((post) => post.url === slug)

    if (posts.length === 0) {
      return { notFound: true }
    }
    const post = posts[0]

    const { title, date, url, content, tags } = post
    const contentWithoutDataview = lineBreakAndRemoveDataview(content)
    const contentWithReplacedImages = replaceLink(date, contentWithoutDataview)
    const processedContent = await remark()
      .use(rehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: { class: 'head-anchor' },
        content: h('span', '#'),
      })
      .use(remarkGfm)
      .use(rehypeExternalLinks, {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer'],
      })
      .use(rehypeShiki, {
        themes: {
          light: 'min-light',
          dark: 'material-theme-darker',
        },
      })
      .use(remarkMath)
      .use(rehypeKatex)
      .use(html)
      .process(contentWithReplacedImages)
    const contentHtml = processedContent.toString()

    return {
      props: {
        title,
        date,
        tags,
        url,
        contentHtml,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPosts().map((post) => ({
    params: { slug: [post.url] },
  }))

  return { paths, fallback: false }
}

const replaceLink = (date: string, content: string) => {
  return content.replace(
    /!\[\[(.*?)\.(jpg|png|jpeg)(?:\|(\d+))?\]\]/g,
    (_, name, ext) => {
      return `![${name}.${ext}](https://pub-b6229d3c7a914a1a8a4e5f22934aec67.r2.dev/${new Date(date).getFullYear()}/${name}.${ext})`
    },
  )
}

const lineBreakAndRemoveDataview = (content: string) => {
  return content.replace(/```dataview[\s\S]*?```/g, '').replace(/\n/g, '  \n')
}
