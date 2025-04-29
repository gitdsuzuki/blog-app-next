'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateCategory: React.FC = () => {
  const router = useRouter()
  const [category, setCategory] = useState<string>("")

  const body: {
    name: string,
    posts: []
  } = {
    name: category,
    posts: []
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response: Response = await fetch(
      process.env.NEXT_PUBLIC_APP_BASE_URL + '/api/admin/categories',
      requestOptions,
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリー名
          </label>
          <input 
            type="text"
            name="name"
            id="name"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="記事のタイトルを入力"
            onChange={(e) => setCategory(e.target.value)}
          />
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