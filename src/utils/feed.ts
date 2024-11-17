import { Feed } from 'feed'
import { getAllPosts } from './posts'
import { processContent } from '@/utils/markdown'

export async function generateRssFeed() {
  const posts = getAllPosts()
  const siteURL = 'https://liuzhch1.com'
  const date = new Date()

  const author = {
    name: 'Joey Liu',
    email: 'hi@liuzhch1.com',
    link: siteURL,
  }

  const feed = new Feed({
    title: "Joey Liu's Blog",
    description: "Joey Liu's personal blog",
    id: siteURL,
    link: siteURL,
    language: 'en',
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `CC BY-NC-SA 4.0 2024-PRESENT Joey Liu`,
    updated: date,
    feedLinks: {
      rss: `${siteURL}/rss.xml`,
    },
    author,
  })

  await Promise.all(
    posts.map(async (post) => {
      const contentHtml = await processContent(post.date, post.content)
      feed.addItem({
        title: post.title,
        id: `${siteURL}/posts/${post.url}`,
        link: `${siteURL}/posts/${post.url}`,
        description: post.content.slice(0, 200),
        content: contentHtml,
        author: [author],
        date: new Date(post.date),
      })
    }),
  )

  return feed.rss2()
}
