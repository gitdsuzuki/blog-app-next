'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Select, { MultiValue } from 'react-select'
import type { Post, PostDetailsProps, PostResponse, Category, CategoriesResponse } from '@/app/_types/index'

const EditPost: React.FC<PostDetailsProps> = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<{id: string, name: string}[]>([])
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const resPost: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/posts/${id}`)
      const dataPost = await resPost.json() as PostResponse
      setPost(dataPost.post)
      console.log(dataPost.post)

      const resCategories: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/`)
      const allCategories = await resCategories.json() as CategoriesResponse
      setAllCategories(allCategories.categories) 

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
        thumbnailUrl: post?.thumbnailUrl,
        categories: selectedCategories,
      })
      })
    setLoading(false)

    if (response.ok) {
      window.alert("更新しました")
    } else {
      window.alert('通信エラーです。')
    }

    router.push('/admin/posts')
  }

  const handleDelete = async () => {
    setLoading(true)
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/posts/${id}`, {
      method: 'DELETE',
      })
    setLoading(false)

    if (response.ok) {
      window.alert("削除しました")
    } else {
      window.alert('通信エラーです。')
    }

    router.push('/admin/posts')
  }

  if (loading) return <p>読み込み中です...</p>
  if (!post) return <div className="p-10 text-center text-3xl">404: 記事が見つかりませんでした</div>

  return (
    <div className="p-8 bg-white w-full">
      <div className="text-2xl font-semibold mb-6 text-gray-800">
        記事編集
      </div>
      <form onSubmit={handleEdit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input 
            type="text"
            name="title"
            id="title"
            value={post.title}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="記事のタイトルを入力"
            onChange={(e) => setPost({...post, title: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            内容
          </label>
          <textarea
                    id="content"
                    name="content"
                    rows={3}
                    value={post.content}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="記事の内容を入力"
                    onChange={(e) => setPost({...post, content: e.target.value})}
          >
          </textarea>
        </div>
        <div>
          <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700 mb-1">
            サムネイルURL
          </label>
          <input
              type="text"
              name="thumbnail"
              id="thumbnail"
              value={post.thumbnailUrl}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/image.jpg"
              onChange={(e) => setPost({...post, thumbnailUrl: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリー
          </label>
          <div className="block w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <Select
              options={allCategories?.map(elem => ({value: elem.id, label: elem.name})) || []}
              defaultValue={post?.postCategories?.map(elem => ({value: elem.category?.id, label: elem.category?.name})) || []}
              id="categories"
              name="categories"
              isMulti
              onChange={handleSelectedCategory}
            />
          </div>
        </div>
        <div className="flex space-x-4 pt-4">
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

export default EditPost