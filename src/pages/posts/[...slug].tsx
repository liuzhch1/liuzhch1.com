import Head from 'next/head'
import { processContent } from '@/utils/markdown'
import { getAllPosts } from '@/utils/posts'
import { formatDate } from '@/utils'
import Remark42 from '@/components/Remark42'
import Script from 'next/script'
import { useEffect } from 'react'
import mediumZoom from 'medium-zoom'

interface PostProps {
  title: string
  date: string
  tags: string[]
  contentHtml: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Plyr: any
  }
}

export default function Post({ title, date, tags, contentHtml }: PostProps) {
  useEffect(() => {
    const zoom = mediumZoom('img', {
      margin: 20,
      background: 'rgba(1, 1, 1, 0.6)',
    })
    return () => {
      zoom.detach()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Plyr) {
      const player = new window.Plyr('#player')
      return () => {
        player.destroy()
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>{title} | Joey's Blog</title>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
      </Head>
      <h1 className="text-3xl mb-0">{title}</h1>
      <time className="text-sm text-gray-500">
        {formatDate({ date, time: tags.includes('moment'), year: true })}
      </time>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <Remark42 />
      <Script
        src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (document.querySelector('#player')) {
            new window.Plyr('#player')
          }
        }}
      />
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
    const contentHtml = await processContent(date, content, {
      useShiki: true,
      useHeadings: true,
    })

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
