import { useFetchAdmin } from '@/app/admin/_hooks/useFetchAdmin'

export const useCategoriesAdmin = (token: string | null) => {
  const { data, error, isLoading } = useFetchAdmin(
    '/api/admin/categories/',
    token ?? ''
  )

  return {
    categories: data?.categories,
    isLoading,
    isError: error,
  }
}