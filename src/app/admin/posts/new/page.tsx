'use client'

import { useState, useEffect } from 'react'
import { MultiValue} from 'react-select'
import { useRouter } from 'next/navigation'
import { Post, CategoriesResponse } from '@/app/_types'
import PostForm from '@/app/admin/posts/_components/PostForm'

const CreatePost: React.FC = () => {
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

  const handleCreate = async () => {

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
      <PostForm post={post} setPost={setPost} handleSelectedCategory={handleSelectedCategory} handleCreate={handleCreate} />
    </div>
  )
}

export default CreatePost