'use client'

import React from 'react'
import Link from 'next/link'

const NavBar: React.FC = () => {
  return (
    <div className='h-screen w-60 bg-gray-50 border-r border-gray-200'>
      <ul>
        <Link href="/admin/posts">
          <li className='block font-medium px-4 py-4 hover:bg-sky-200'>
            記事一覧
          </li>
        </Link>
        <Link href="/admin/categories">
        <li className='block font-medium px-4 py-4 hover:bg-sky-200'>
          カテゴリー一覧
        </li>
        </Link>
      </ul>
    </div>
  )
}

export default NavBar