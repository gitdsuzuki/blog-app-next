'use client'

import PostBoxAdmin from '@/app/admin/posts/_components/PostBoxAdmin'
import type { Post } from '@/app/_types'
import Link from 'next/link'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { usePostsAdmin } from '@/app/_hooks/usePosts'

const AdminPostList: React.FC = () => {
  const { token } = useSupabaseSession()
  const { posts, isLoading } = usePostsAdmin(token)

  if (isLoading) return <p>読み込み中です...</p>

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
        {posts?.map((post: Post) => <PostBoxAdmin key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default AdminPostList