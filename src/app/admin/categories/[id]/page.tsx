'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Category, CategoryResponse, PostDetailsProps } from '@/app/_types/index'

const EditCategory: React.FC<PostDetailsProps> = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const res: Response = await fetch(`http://localhost:3000/api/admin/categories/${id}`)
      const data = await res.json() as CategoryResponse
      setCategory(data.category)
      setLoading(false) 
    }
    fetcher()
  },[id])

  const handleEdit = async () => {
    setLoading(true)
    const response: Response = await fetch(`http://localhost:3000/api/admin/categories/${id}`, {
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
    } else {
      window.alert('通信エラーです。')
    }

    router.push('/admin/categories')
  }

  const handleDelete = async () => {
    setLoading(true)
    const response: Response = await fetch(`http://localhost:3000/api/admin/categories/${id}`, {
      method: 'DELETE',
      })
    setLoading(false)

    if (response.ok) {
      window.alert("削除しました")
    } else {
      window.alert('通信エラーです。')
    }

    router.push('/admin/categories')
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
          <input 
            type="text"
            name="title"
            id="title"
            value={category.name}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="記事のタイトルを入力"
            onChange={(e) => setCategory({...category, name: e.target.value})}
          />
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