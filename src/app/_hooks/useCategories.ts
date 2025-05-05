import { CategoriesResponse } from "@/app/_types/index";
import useSWR from 'swr'

const fetcher = async (key: string) => {
  return fetch(key).then((res) => res.json() as Promise<CategoriesResponse>);
}

export const useCategories = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/categories/`,
    fetcher
  )

  return {
    categories: data?.categories,
    isLoading,
    isError: error,
  }
}
