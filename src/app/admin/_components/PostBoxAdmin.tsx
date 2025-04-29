'use client'

import Dayjs from 'dayjs'
import Link from 'next/link'
import type { Post } from '@/app/_types'

const PostBoxAdmin: React.FC<{ post: Post }> = ({post}) => {
  const { id, title, createdAt } = post

  return (
    <div className="space-y-5">
      <Link href={`/admin/posts/${id}`}>
        <div className="py-3 border-b border-gray-200">
          <div className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
            {title}
          </div>
          <div className="tex-sm text-gray-500">
            {Dayjs(createdAt).format("YYYY/M/DD")}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostBoxAdmin