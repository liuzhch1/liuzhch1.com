import Head from 'next/head'
import { remark } from 'remark'
import html from 'remark-html'
import { getAllPosts } from '@/utils/posts'

interface PostProps {
  title: string
  date: string
  contentHtml: string
}

export default function Post({ title, date, contentHtml }: PostProps) {
  return (
    <>
      <Head>
        <title>{title} | Joey's Blog</title>
      </Head>
      <article className="blog-post">
        <h1>{title}</h1>
        <time>{new Date(date).toLocaleDateString()}</time>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </>
  )
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] }
}) {
  const slug = params.slug.join('/')
  console.log('Requested slug:', slug)

  try {
    const posts = getAllPosts().filter((post) => post.url === slug)

    if (posts.length === 0) {
      return { notFound: true }
    }
    const post = posts[0]

    const { title, date, url, content } = post
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      props: {
        title,
        date,
        url,
        contentHtml,
      },
    }
  } catch (error) {
    console.error(`Error reading file for slug ${slug}:`, error)
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
