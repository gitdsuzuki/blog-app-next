import { useFetchAdmin } from '@/app/admin/_hooks/useFetchAdmin'

export const usePostsAdmin = (token: string | null) => {
  const { data, error, isLoading } = useFetchAdmin(
    '/api/admin/posts/',
    token ?? ''
  )

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  }
}