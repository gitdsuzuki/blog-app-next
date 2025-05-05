import { useFetch } from '@/app/_hooks/useFetch'

export const usePosts = () => {
  const { data, error, isLoading } = useFetch('/api/posts/')

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  } 
}
