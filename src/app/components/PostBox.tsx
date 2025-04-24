'use client'

import Dayjs from 'dayjs'
import Link from 'next/link'
import type { Post } from '@/app/_types/index.ts'

const PostBox: React.FC<{ post: Post }> = ({post}) => {
  const { id, title, createdAt, categories, content } = post

  return (
    <div className="w-full pt-10 px-4">
      <Link href={`/post/${id}`}>
        <div className="mx-auto border border-zinc-300 py-4 px-5 max-w-3xl">
          <div className="flex pr-30">
            <div className="tex-sm opacity-50 flex flex-auto justify-start">
              {Dayjs(createdAt).format("YYYY/M/DD")}
            </div>
            <div className="flex flex-auto justify-end">
              <ul className="flex text-xs">
                {categories.map((elem: string) =>
                <li key={elem} className="text-sky-700 border border-sky-700 p-1.5 ml-2 rounded-md">{elem}</li>
                )}
              </ul>
            </div>
          </div>
          <div className="text-2xl py-2 mb-2 opacity-80">
            {title}
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} className="line-clamp-2 opacity-80"/>
        </div>
      </Link>
    </div>
  )
}

export default PostBox