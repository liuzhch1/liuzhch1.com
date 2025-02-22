import { formatDate } from '@/utils'
import { PostData } from '@/utils/posts'
import Link from 'next/link'

const PostsList: React.FC<{
  posts: PostData[]
}> = ({ posts }) => {
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, PostData[]>,
  )

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-28">
      {years.map((year) => (
        <section key={year} className="relative">
          <div className="absolute -left-8 -top-[72px] text-9xl font-bold opacity-[0.05] select-none">
            {year}
          </div>
          <ol reversed className="relative space-y-4 list-none pl-0">
            {postsByYear[year].map((post) => (
              <li key={post.url} className="postlist-item">
                <Link href={`/posts/${post.url}`} className="text-lg">
                  {post.title}
                </Link>
                <time
                  className="ml-2 text-sm text-gray-500"
                  dateTime={post.date}
                >
                  {formatDate({
                    date: post.date,
                    time: post.tags.includes('moment'),
                  })}
                </time>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

export default PostsList
