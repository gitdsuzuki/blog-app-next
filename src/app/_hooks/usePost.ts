import { PostResponse } from "@/app/_types/index";
import useSWR from 'swr'

const fetcher = async (key: string) => {
  return fetch(key).then((res) => res.json() as Promise<PostResponse>);
}

export const usePost = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/posts/${id}`,
    fetcher
  )

  return {
    post: data?.post,
    isLoading,
    isError: error,
  }
}
