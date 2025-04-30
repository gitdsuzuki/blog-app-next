'use client'

import React from 'react'
import { Category } from '@/app/_types'

interface CategoryFormProps {
  category: Category | null
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>
  handleCreate?: React.MouseEventHandler<HTMLButtonElement>
  handleEdit?: React.MouseEventHandler<HTMLButtonElement>
  handleDelete?: React.MouseEventHandler<HTMLButtonElement>
}

const CategoryForm: React.FC<CategoryFormProps> = ({category, setCategory, handleCreate, handleEdit, handleDelete}) => {

  return (
    <form className="space-y-6">
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
        カテゴリー名
      </label>
      <input 
        type="text"
        name="name"
        id="name"
        value={category?.name || ""}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="カテゴリー名を入力"
        onChange={(e) => {
          setCategory(prevCategory => {
            if (!prevCategory) return null
            return {...prevCategory, name: e.target.value}
          })
        }}
      />
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
            type="button"
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

export default CategoryForm