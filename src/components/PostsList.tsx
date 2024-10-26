import { Post } from '@/types'
import Link from 'next/link'

interface PostsListProps {
  limit?: number
  posts: Post[]
}

const PostsList: React.FC<PostsListProps> = ({ limit, posts }) => {
  const displayedPosts = limit ? posts.slice(0, limit) : posts
  const allPostsCount = posts.length

  const formatDate = (date: string) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
            <Link href={`/posts/${post.url}`} className="postlist-link">
              {post.title}
            </Link>
            <time className="postlist-date" dateTime={post.date}>
              {formatDate(post.date)}
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
