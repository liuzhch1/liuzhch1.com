import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

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
    const postsDirectory = path.join(process.cwd(), 'content')

    const filenames = fs.readdirSync(postsDirectory)

    const posts = filenames
      .map((filename) => {
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const slug = filename.replace(/\.md$/, '')

        return {
          slug,
          title: data.title || slug,
          date: data.date,
          url: data.url || slug,
          content,
        }
      })
      .filter((post) => post.url === slug)

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
  const postsDirectory = path.join(process.cwd(), 'content')
  const filenames = fs.readdirSync(postsDirectory)

  const paths = filenames.map((filename) => {
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      params: { slug: [data.url || filename.replace(/\.md$/, '')] },
    }
  })

  console.log('paths', JSON.stringify(paths, null, 2))
  return { paths, fallback: false }
}
