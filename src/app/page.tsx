'use client'

import { useState, useEffect } from 'react'
import PostBox from '@/app/_components/PostBox'
import type { Post, PostsResponse } from '@/app/_types'

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_APP_BASE_URL + "/api/posts")
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