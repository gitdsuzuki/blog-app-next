import { useFetch } from '@/app/_hooks/useFetch'

export const useCategories = () => {
  const { data, error, isLoading } = useFetch('/api/categories/')

  return {
    categories: data?.categories,
    isLoading,
    isError: error,
  }
}
