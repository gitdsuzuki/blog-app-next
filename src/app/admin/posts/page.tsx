'use client'

import { useState, useEffect } from 'react'
import PostBoxAdmin from '@/app/admin/posts/_components/PostBoxAdmin'
import type { Post } from '@/app/_types'
import Link from 'next/link'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'

const AdminPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const { token } = useSupabaseSession()

  useEffect(() => {
    if (!token) return

    const fetcher = async () => {
      const res = await fetch('/api/admin/posts', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // 👈 Header に token を付与
        },
      })
      const { posts } = await res.json()
      setPosts([...posts])
    }

    fetcher()
  }, [token])

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