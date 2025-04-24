'use client'

import React from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <div className="font-bold flex text-white bg-neutral-800 p-6 text-md">
      <div className="flex flex-auto justfy-start">
        <Link href="/"><h1>Blog</h1></Link>
      </div>
      <div className="flex flex-auto justify-end">
        <Link href="/contact">お問い合わせ</Link>
      </div>
    </div>
  )
}

export default Header