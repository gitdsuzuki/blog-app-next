'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CategoryForm from '@/app/admin/_components/CategoryForm'
import { Category } from '@/app/_types'

const CreateCategory: React.FC = () => {
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>({id: "", name: "", posts: []})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response: Response = await fetch(
      process.env.NEXT_PUBLIC_APP_BASE_URL + '/api/admin/categories',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: category?.name,
          posts: category?.posts
        })
      }
    )

    if (response.ok) {
      window.alert("作成しました")
      router.push('/admin/categories')
    } else {
      window.alert('通信エラーです。')
    }
  }

  return (
    <div className="p-8 bg-white w-full">
      <div className="text-2xl font-semibold mb-6 text-gray-800">
        カテゴリー作成
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリー名
          </label>
          <CategoryForm category={category} setCategory={setCategory} />
        </div>
        <div className="flex space-x-4">
          <button 
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            作成
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCategory