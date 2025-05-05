import { useFetch } from '@/app/_hooks/useFetch'

export const useCategory = (id: string) => {
  const { data, error, isLoading } = useFetch(`/api/categories/${id}`)

  return {
    category: data?.category,
    isLoading,
    isError: error,
  }
}
