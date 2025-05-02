'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MultiValue } from 'react-select'
import type { Post, PostDetailsProps, PostResponse } from '@/app/_types/index'
import PostForm from '@/app/admin/posts/_components/PostForm'

const EditPost: React.FC<PostDetailsProps> = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<{id: string, name: string}[]>([])
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const resPost: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/posts/${id}`)
      const dataPost = await resPost.json() as PostResponse
      setPost(dataPost.post)
      setLoading(false)
    }
    fetcher()
  },[id])

  const handleSelectedCategory = (newValue: MultiValue<{ value: string; label: string }>) => {
        const selected: {id: string, name: string}[] = newValue.map((elem) => ({id: elem.value, name: elem.label}))
        setSelectedCategories(selected)
  }

  const handleEdit = async () => {
    setLoading(true)
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
    setLoading(false)

    if (response.ok) {
      window.alert("更新しました")
      router.push('/admin/posts')
    } else {
      window.alert('通信エラーです。')
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/posts/${id}`, {
      method: 'DELETE',
      })
    setLoading(false)

    if (response.ok) {
      window.alert("削除しました")
      router.push('/admin/posts')
    } else {
      window.alert('通信エラーです。')
    }
  }

  if (loading) return <p>読み込み中です...</p>
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