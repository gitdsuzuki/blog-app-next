'use client'

import Link from 'next/link'
import type { Category } from '@/app/_types'

const CreateBoxAdmin: React.FC<{ category: Category }> = ({category}) => {
  const { id, name } = category

  return (
    <div className="space-y-5">
      <Link href={`/admin/categories/${id}`}>
        <div className="py-3 border-b border-gray-200">
          <div className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
            {name}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CreateBoxAdmin