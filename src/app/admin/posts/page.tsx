'use client'

import { useState, useEffect } from 'react'
import PostBoxAdmin from '@/app/admin/_components/PostBoxAdmin'
import type { Post, PostsResponse } from '@/app/_types'
import Link from 'next/link'

const AdminPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const response: Response = await fetch("http://localhost:3000/api/admin/posts")
      const data = await response.json() as PostsResponse
      setPosts(data.posts)
    }
    fetcher()
  },[])

  return (
    <div className='w-full bg-white p-6 shadow rounded'>
      <div className='flex justify-between item-center mb-6 pb-4'>
        <div className="text-2xl font-extrabold text-gray-800">
          記事一覧
        </div>
        <Link href={`/admin/posts/new`}>
          <div className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded'>
            新規作成
          </div>
        </Link>
      </div>
      <div className='px-2'>
        {posts.map((post: Post) => <PostBoxAdmin key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default AdminPostList