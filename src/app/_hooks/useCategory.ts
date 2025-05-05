import useSWR from 'swr'
import { CategoryResponse } from '@/app/_types/index'

const fetcher = async (key: string) => {
  return fetch(key).then((res) => res.json() as Promise<CategoryResponse>);
}

export const useCategory = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/categories/${id}`,
    fetcher
  )

  return {
    category: data?.category,
    isLoading,
    isError: error,
  }
}