'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Category, CategoryResponse, PostDetailsProps } from '@/app/_types/index'
import CategoryForm from '@/app/admin/_components/CategoryForm'

const EditCategory: React.FC<PostDetailsProps> = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const res: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/${id}`)
      const data = await res.json() as CategoryResponse
      setCategory(data.category)
      setLoading(false) 
    }
    fetcher()
  },[id])

  const handleEdit = async () => {
    setLoading(true)
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: category?.name,
        posts: category?.posts.map(elem => ({id: elem.postId}))
      })
      })
    setLoading(false)

    if (response.ok) {
      window.alert("更新しました")
      router.push('/admin/categories')
    } else {
      window.alert('通信エラーです。')
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/${id}`, {
      method: 'DELETE',
      })
    setLoading(false)

    if (response.ok) {
      window.alert("削除しました")
      router.push('/admin/categories')
    } else {
      window.alert('通信エラーです。')
    }
  }

  if (loading) return <p>読み込み中です...</p>
  if (!category) return <div className="p-10 text-center text-3xl">404: カテゴリーが見つかりませんでした</div>

  return (
    <div className="p-8 bg-white w-full">
      <div className="text-2xl font-semibold mb-6 text-gray-800">
        カテゴリー編集
      </div>
      <form onSubmit={handleEdit} className="space-y-6">
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
            更新
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            削除
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCategory