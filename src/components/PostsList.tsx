import { PostData } from '@/utils/posts'
import Link from 'next/link'

interface PostsListProps {
  limit?: number
  posts: PostData[]
}

const PostsList: React.FC<PostsListProps> = ({ limit, posts }) => {
  const displayedPosts = limit ? posts.slice(0, limit) : posts
  const allPostsCount = posts.length

  const formatDate = (d: Date) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  const startFrom = allPostsCount + 1
  const postlistStyle = {
    counterReset: `post-counter ${startFrom}`,
  }

  return (
    <>
      <ol reversed className="postlist" style={postlistStyle}>
        {displayedPosts.map((post) => (
          <li key={post.url} className="postlist-item">
            <Link href={`/posts/${post.url}`} className="postlist-link text-lg">
              {post.title}
            </Link>
            <time className="postlist-date ml-2 text-sm" dateTime={post.date}>
              {formatDate(new Date(post.date))}
            </time>
          </li>
        ))}
      </ol>
      {limit && allPostsCount > limit && (
        <p>
          {allPostsCount - limit} more posts can be found in{' '}
          <Link href="/posts">all posts</Link>.
        </p>
      )}
    </>
  )
}

export default PostsList
