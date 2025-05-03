import { PostsResponse } from "@/app/_types/index";
import useSWR from 'swr'

const fetcher = async (key: string) => {
  return fetch(key).then((res) => res.json() as Promise<PostsResponse>);
}

const fetcherAdmin = async ([key, token]: [string, string]) => {
  return fetch(key, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  }).then((res) => res.json() as Promise<PostsResponse>);
}

export const usePosts = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/posts/`,
    fetcher
  )

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  }
}

export const usePostsAdmin = (token: string | null) => {
  const { data, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/posts/`, token],
    fetcherAdmin
  )

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  }
}