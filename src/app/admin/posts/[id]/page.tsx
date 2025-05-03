'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MultiValue } from 'react-select'
import type { Post, PostDetailsProps } from '@/app/_types/index'
import PostForm from '@/app/admin/posts/_components/PostForm'
import { usePost } from '@/app/_hooks/usePost'

const EditPost: React.FC<PostDetailsProps> = ({ params }) => {
  const { id } = params
  const { post: fetchedPost, isLoading } = usePost(id)
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<{id: string, name: string}[]>([])
  const [post, setPost] = useState<Post | null>(null)
  
  useEffect(() => {
    setPost(fetchedPost ?? null)
  },[fetchedPost])

  const handleSelectedCategory = (newValue: MultiValue<{ value: string; label: string }>) => {
        const selected: {id: string, name: string}[] = newValue.map((elem) => ({id: elem.value, name: elem.label}))
        setSelectedCategories(selected)
  }

  const handleEdit = async () => {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: post?.title,
        content: post?.content,
        thumbnailImageKey: post?.thumbnailImageKey,
        categories: selectedCategories,
      })
      })

    if (response.ok) {
      window.alert("更新しました")
      router.push('/admin/posts')
    } else {
      window.alert('通信エラーです。')
    }
  }

  const handleDelete = async () => {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/posts/${id}`, {
      method: 'DELETE',
      })

    if (response.ok) {
      window.alert("削除しました")
      router.push('/admin/posts')
    } else {
      window.alert('通信エラーです。')
    }
  }

  if (isLoading) return <p>読み込み中です...</p>
  if (!post) return <div className="p-10 text-center text-3xl">404: 記事が見つかりませんでした</div>

  return (
    <div className="p-8 bg-white w-full">
      <div className="text-2xl font-semibold mb-6 text-gray-800">
        記事編集
      </div>
        <PostForm post={post} setPost={setPost} handleSelectedCategory={handleSelectedCategory} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  )
}

export default EditPost