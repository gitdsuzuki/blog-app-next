'use client'

import React from 'react'
import Select, { MultiValue } from 'react-select'
import { useState, useEffect } from 'react'
import { Post, Category, CategoriesResponse } from '@/app/_types'
import { supabase } from '@/utils/supabase'　
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

interface PostFormProps {
  post: Post | null
  setPost: React.Dispatch<React.SetStateAction<Post | null>>
  handleSelectedCategory: (newValue: MultiValue<{ value: string; label: string }>) => void
  handleCreate?: React.MouseEventHandler<HTMLButtonElement>
  handleEdit?: React.MouseEventHandler<HTMLButtonElement>
  handleDelete?: React.MouseEventHandler<HTMLButtonElement>
}

const PostForm: React.FC<PostFormProps> = ({post, setPost, handleSelectedCategory, handleCreate, handleEdit, handleDelete}) => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null)

  useEffect(() => {
      const fetcher = async () => {
        const resCategories: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/`)
        const allCategories = await resCategories.json() as CategoriesResponse
        setAllCategories(allCategories.categories) 
      }
      fetcher()
    },[])

  useEffect(() => {
    const fetcher = async () => {
      if (!post?.thumbnailImageKey) return

      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('post-thumbnail')
        .getPublicUrl(post?.thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)
    }

    fetcher()
  }, [post?.thumbnailImageKey])

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      return
    }

    const file = event.target.files[0]

    const filePath = `private/${uuidv4()}`

    const { data, error } = await supabase.storage
      .from('post-thumbnail')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      alert(error.message)
      return
    }

    setPost({...post, thumbnailImageKey: data.path})
  }

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          タイトル
        </label>
        <input 
          type="text"
          name="title"
          id="title"
          value={post?.title || ""}
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
          value={post?.content || ""}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="記事の内容を入力"
          onChange={(e) => setPost({...post, content: e.target.value})}
        >
        </textarea>
      </div>
      <div>
      {thumbnailImageUrl && (
   　   <div className="mt-2">
   　　　 <Image
    　　　src={thumbnailImageUrl}
     　   alt="thumbnail"
     　   width={400}
     　   height={400}
    　    />
   　   </div>
 　　　)}
        <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700 mb-1">
          サムネイルURL
        </label>
        <input type="file" id="thumbnailImageKey" onChange={handleImageChange}　accept="image/*" />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリー
        </label>
        <div className="block w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <Select
            options={allCategories.map(category => ({value: category.id, label: category.name}))}
            defaultValue={post?.postCategories?.map(elem => ({value: elem.category?.id, label: elem.category?.name})) || []}
            id="categories"
            name="categories"
            isMulti
            onChange={handleSelectedCategory}
          />
        </div>
      </div>
      <div>
        { handleCreate &&
          <button
          onClick={handleCreate}
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            作成
          </button>
        }
      </div>
      <div className="flex space-x-4">
        { handleEdit &&
          <button 
            onClick={handleEdit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            更新
          </button>
        }
        { handleDelete && 
          <button
            onClick={handleDelete}
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              削除
          </button>
        }
      </div>
    </form>
  )
}

export default PostForm