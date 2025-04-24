'use client'

import { useState, useEffect } from 'react'
import PostBox from '@/components/PostBox'
import type { Post, PostsResponse } from '@/types/index.ts'

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const response: Response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await response.json() as PostsResponse
      setPosts(data.posts)
    }
    fetcher()
  },[])

  return (
    <>
      {posts.map((post: Post) => <PostBox key={post.id} post={post} />)}
    </>
  )
}

export default PostList