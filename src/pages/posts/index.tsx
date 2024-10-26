import { GetStaticProps } from 'next'
import PostsList from '@/components/PostsList'
import Head from 'next/head'
import { Post } from '@/types'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface AllPostsProps {
  posts: Post[]
}

export default function AllPosts({ posts }: AllPostsProps) {
  return (
    <>
      <Head>
        <title>All Posts - Joey's Blog</title>
        <meta name="description" content="All blog posts by Joey" />
      </Head>
      <div className="posts-container">
        <h1>All Posts</h1>
        <PostsList posts={posts} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'content')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    const slug = filename.replace(/\.md$/, '')

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      url: data.url || slug,
    }
  })

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    props: {
      posts,
    },
  }
}
