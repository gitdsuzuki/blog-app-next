'use client'

import Dayjs from 'dayjs'
import Link from 'next/link'
import type { Post } from '@/app/_types'

const PostBox: React.FC<{ post: Post }> = ({post}) => {
  const { id, title, createdAt, postCategories, content } = post

  return (
    <div className="w-full pt-10 px-4">
      <Link href={`/posts/${id}`}>
        <div className="mx-auto border border-zinc-300 py-4 px-5 max-w-3xl">
          <div className="flex pr-30">
            <div className="tex-sm opacity-50 flex flex-auto justify-start">
              {Dayjs(createdAt).format("YYYY/M/DD")}
            </div>
            <div className="flex flex-auto justify-end">
              <ul className="flex text-xs">
                {postCategories?.map((elem: { category: {id: string, name: string}}) =>
                <li key={elem.category.id} className="text-sky-700 border border-sky-700 p-1.5 ml-2 rounded-md">{elem.category.name}</li>
                )}
              </ul>
            </div>
          </div>
          <div className="text-2xl py-2 mb-2 opacity-80">
            {title}
          </div>
          <div dangerouslySetInnerHTML={{ __html: content || "" }} className="line-clamp-2 opacity-80"/>
        </div>
      </Link>
    </div>
  )
}

export default PostBox