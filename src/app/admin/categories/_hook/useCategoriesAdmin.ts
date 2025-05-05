import { CategoriesResponse } from "@/app/_types/index";
import useSWR from 'swr'

const fetcherAdmin = async ([key, token]: [string, string]) => {
  return fetch(key, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  }).then((res) => res.json() as Promise<CategoriesResponse>);
}

export const useCategoriesAdmin = (token: string | null) => {
  const { data, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/`, token],
    fetcherAdmin
  )

  return {
    categories: data?.categories,
    isLoading,
    isError: error,
  }
}