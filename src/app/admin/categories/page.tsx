'use client'

import CategoryBoxAdmin from '@/app/admin/categories/_components/CategoryBoxAdmin'
import type { Category } from '@/app/_types'
import Link from 'next/link'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { useCategoriesAdmin } from './_hook/useCategoriesAdmin'

const AdminCategoryList: React.FC = () => {
  const { token } = useSupabaseSession()
  const { categories, isLoading } = useCategoriesAdmin(token)

  if (isLoading) return <p>読み込み中です...</p>

  return (
    <div className='w-full bg-white p-6 shadow rounded'>
      <div className='flex justify-between item-center mb-6 pb-4'>
        <div className="text-2xl font-extrabold text-gray-800">
          カテゴリー一覧
        </div>
        <Link href={`/admin/categories/new`}>
          <div className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded'>
            新規作成
          </div>
        </Link>
      </div>
      <div className='px-2'>
        {categories?.map((category: Category) => <CategoryBoxAdmin key={category.id} category={category} />)}
      </div>
    </div>
  )
}

export default AdminCategoryList