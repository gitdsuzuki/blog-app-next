'use client'

import PostBox from '@/app/_components/PostBox'
import type { Post } from '@/app/_types'
import { usePosts } from '@/app/_hooks/usePosts'

const PostList: React.FC = () => {
  const { posts, isLoading } = usePosts()

  if (isLoading) return <p>読み込み中です...</p>

  return (
    <>
      {posts?.map((post: Post) => <PostBox key={post.id} post={post} />)}
    </>
  )
}

export default PostList