'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Category, PostDetailsProps } from '@/app/_types/index'
import CategoryForm from '@/app/admin/categories/_components/CategoryForm'
import { useCategory } from '@/app/_hooks/useCategory'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'

const EditCategory: React.FC<PostDetailsProps> = ({ params }) => {
  const { id } = params
  const { category: fetchedCat, isLoading, isError } = useCategory(id)
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>(null)
  const { token } = useSupabaseSession()

  useEffect(() => {
    setCategory(fetchedCat ?? null)
  },[fetchedCat])

  const handleEdit = async () => {
    if (!token) return 

    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        name: category?.name,
        posts: category?.posts.map(elem => ({id: elem.postId}))
      })
      })

    if (response.ok) {
      window.alert("更新しました")
      router.push('/admin/categories')
    } else {
      window.alert('通信エラーです。')
    }
  }

  const handleDelete = async () => {
    if (!token) return 
    
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      })

    if (response.ok) {
      window.alert("削除しました")
      router.push('/admin/categories')
    } else {
      window.alert('通信エラーです。')
    }
  }

  if (isLoading) return <p>読み込み中です...</p>
  if (isError) return <div className="p-10 text-center text-3xl">404: カテゴリーが見つかりませんでした</div>

  return (
    <div className="p-8 bg-white w-full">
      <div className="text-2xl font-semibold mb-6 text-gray-800">
        カテゴリー編集
      </div>
      <div>
        <CategoryForm category={category} setCategory={setCategory} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default EditCategory