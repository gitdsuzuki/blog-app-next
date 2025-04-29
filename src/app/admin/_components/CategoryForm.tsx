'use client'

import React from 'react'
import { Category } from '@/app/_types'

interface CategoryFormProps {
  category: Category | null
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>
}

const CategoryForm: React.FC<CategoryFormProps> = ({category, setCategory}) => {

  return (
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
  )
}

export default CategoryForm