'use client'

import { useState, useEffect } from 'react'
import { MultiValue} from 'react-select'
import { useRouter } from 'next/navigation'
import { Post, CategoriesResponse } from '@/app/_types'
import PostForm from '@/app/admin/_components/PostForm'

const CreateCategory: React.FC = () => {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>({id: "", title: "", content: "", thumbnailUrl: "", createdAt: "", postCategories: []})
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([])
  const [categoryIds, setCategoryIds] = useState<Array<{id: string}>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const response: Response = await fetch(process.env.NEXT_PUBLIC_APP_BASE_URL + "/api/admin/categories")
      const data = await response.json() as CategoriesResponse
      setCategories(data.categories)
      setLoading(false)
    }
    fetcher()
  },[])

  const handleSelectedCategory = (newValue: MultiValue<{ value: string; label: string }>) => {
        const selected: {id: string}[] = newValue.map((elem) => ({id: elem.value}))
        setCategoryIds(selected)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCategoryIds(categories.map(category => ({id: category.id})))

    const response: Response = await fetch(
      process.env.NEXT_PUBLIC_APP_BASE_URL + '/api/admin/posts',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: post?.title,
          content: post?.content,
          thumbnailUrl: post?.thumbnailUrl,
          categories: categoryIds
        })
      }
    )

    if (response.ok) {
      window.alert("作成しました")
      router.push('/admin/posts')
    } else {
      window.alert('通信エラーです。')
    }
  }

  if (loading) return <p>読み込み中です...</p>

  return (
    <div className="p-8 bg-white w-full">
      <div className="text-2xl font-semibold mb-6 text-gray-800">
        記事作成
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PostForm post={post} setPost={setPost} handleSelectedCategory={handleSelectedCategory} />
        <button 
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          作成
        </button>
      </form>
    </div>
  )
}

export default CreateCategory