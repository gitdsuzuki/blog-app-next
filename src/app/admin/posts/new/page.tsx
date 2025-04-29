'use client'

import { useState, useEffect } from 'react'
import Select, { MultiValue} from 'react-select'
import { useRouter } from 'next/navigation'
import { CategoriesResponse } from '@/app/_types'

const CreateCategory: React.FC = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [thumbnailUrl, setThumbnailUrl] =useState<string>("https://placehold.jp/800x400.png")
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([])
  const [categoryIds, setCategoryIds] = useState<Array<{id: string}>>([])

  const body: {
    title: string,
    content: string,
    thumbnailUrl: string,
    categories: Array<{id: string}>,
  } = {
    title: title,
    content: content,
    thumbnailUrl: thumbnailUrl,
    categories: categoryIds,
  }

  const requestOptions: {
    method: string,
    headers: {[index: string]: string},
    body: string
  } = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }

  useEffect(() => {
    const fetcher = async () => {
      const response: Response = await fetch("http://localhost:3000/api/admin/categories")
      const data = await response.json() as CategoriesResponse
      setCategories(data.categories)
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
      'http://localhost:3000/api/admin/posts',
      requestOptions,
    )

    if (response.ok) {
      window.alert("作成しました")
    } else {
      window.alert('通信エラーです。')
    }

    router.push('/admin/posts')
  }

  return (
    <div className="p-8 bg-white w-full">
      <div className="text-2xl font-semibold mb-6 text-gray-800">
        記事作成
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input 
            type="text"
            name="title"
            id="title"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="記事のタイトルを入力"
            onChange={(e) => setTitle(e.target.value)}
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
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="記事の内容を入力"
            onChange={(e) => setContent(e.target.value)}
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
            value={thumbnailUrl}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://placehold.jp/800x400.png"
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリー
          </label>
          <div className="block w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <Select
              options={categories.map(category => ({value: category.id, label: category.name}))}
              id="categories"
              name="categories"
              isMulti
              onChange={handleSelectedCategory}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button 
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            作成
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCategory