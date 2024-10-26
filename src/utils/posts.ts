import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostData {
  slug: string
  title: string
  date: string
  url: string
  content: string
}

export function getAllPosts(): PostData[] {
  const postsDirectory = path.join(process.cwd(), 'content')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map((filename) => {
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
}
