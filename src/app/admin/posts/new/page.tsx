'use client'

import { useState } from 'react'
import { MultiValue} from 'react-select'
import { useRouter } from 'next/navigation'
import { Post } from '@/app/_types'
import PostForm from '@/app/admin/posts/_components/PostForm'
import { useCategories } from '@/app/_hooks/useCategories'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'

const CreatePost: React.FC = () => {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>({id: "", title: "", content: "", thumbnailImageKey: "", createdAt: "", postCategories: []})
  const [categoryIds, setCategoryIds] = useState<Array<{id: string}>>([])
  const { categories, isLoading } = useCategories()
  const { token } = useSupabaseSession()

  const handleSelectedCategory = (newValue: MultiValue<{ value: string; label: string }>) => {
        const selected: {id: string}[] = newValue.map((elem) => ({id: elem.value}))
        setCategoryIds(selected)
  }

  const handleCreate = async () => {

    setCategoryIds(categories?.map(category => ({id: category.id})) ?? [])

    const response: Response = await fetch(
      process.env.NEXT_PUBLIC_APP_BASE_URL + '/api/admin/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          title: post?.title,
          content: post?.content,
          thumbnailImageKey: post?.thumbnailImageKey,
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

  if (isLoading) return <p>読み込み中です...</p>

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