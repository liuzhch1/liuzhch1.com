import { getAllPosts } from '@/utils/posts'
import PostsList from '@/components/PostsList'
import { PostData } from '@/utils/posts'
import Head from 'next/head'
import { GetStaticProps } from 'next'

export default function Home({ posts }: { posts: PostData[] }) {
  return (
    <>
      <Head>
        <title>Joey Liu's Blog</title>
        <meta
          name="description"
          content="Joey Liu's personal blog page. 博客自留地，记录我生活中一些闪光的瞬间"
        />
      </Head>
      <div className="text-lg font-medium">
        博客自留地，记录我生活中一些闪光的瞬间
      </div>
      <div className="mt-24">
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
