'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CategoryForm from '@/app/admin/categories/_components/CategoryForm'
import { Category } from '@/app/_types'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'

const CreateCategory: React.FC = () => {
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>({id: "", name: "", posts: []})
  const { token } = useSupabaseSession()

  const handleCreate = async () => {
    if (!token) return 
    
    const response: Response = await fetch(
      process.env.NEXT_PUBLIC_APP_BASE_URL + '/api/admin/categories',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
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
      <div>
        <CategoryForm category={category} setCategory={setCategory} handleCreate={handleCreate}/>
      </div>
    </div>
  )
}

export default CreateCategory