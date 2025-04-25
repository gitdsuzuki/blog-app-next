'use client'

import { useState, useEffect } from 'react'
import PostBox from '@/app/_components/PostBox'
import type { MicroCmsPost, MicroCmsPostsResponse } from '@/app/_types'

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const response: Response = await fetch("https://dsuzuki.microcms.io/api/v1/posts", {
        headers: {
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      })
      const data = await response.json() as MicroCmsPostsResponse
      setPosts(data.contents)
    }
    fetcher()
  },[])

  return (
    <>
      {posts.map((post: MicroCmsPost) => <PostBox key={post.id} post={post} />)}
    </>
  )
}

export default PostList