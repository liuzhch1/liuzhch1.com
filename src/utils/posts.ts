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

function parseDate(dateStr: string): string {
  // Try parsing ISO format first (2024-08-12T20:58+08:00)
  const isoDate = new Date(dateStr)
  if (!isNaN(isoDate.getTime())) {
    return isoDate.toISOString()
  }

  // Try parsing simple format (2024-10-31 12:52)
  const [datePart, timePart] = dateStr.split(' ')
  if (datePart && timePart) {
    const [year, month, day] = datePart.split('-').map(Number)
    const [hour, minute] = timePart.split(':').map(Number)
    const parsedDate = new Date(year, month - 1, day, hour, minute)
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString()
    }
  }

  // If both parsing attempts fail, throw an error
  throw new Error(`Invalid date format: ${dateStr}`)
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
      date: parseDate(data.date ?? data.datetime),
      url: data.url || slug,
      content,
    }
  })
}
