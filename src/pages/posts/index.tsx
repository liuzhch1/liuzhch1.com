import { GetStaticProps } from 'next'
import PostsList from '@/components/PostsList'
import Head from 'next/head'
import { getAllPosts, PostData } from '@/utils/posts'

interface AllPostsProps {
  posts: PostData[]
}

export default function AllPosts({ posts }: AllPostsProps) {
  return (
    <>
      <Head>
        <title>All Posts - Joey's Blog</title>
        <meta name="description" content="All blog posts by Joey" />
      </Head>
      <div className="posts-container">
        <h1 className="text-2xl">All Posts</h1>
        <PostsList posts={posts} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts().map(({ slug, title, date, url, tags }) => ({
    slug,
    title,
    date,
    url,
    tags,
  }))

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    props: {
      posts,
    },
  }
}
