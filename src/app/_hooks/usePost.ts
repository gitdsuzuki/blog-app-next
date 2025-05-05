import { useFetch } from "@/app/_hooks/useFetch";

export const usePost = (id?: string) => {
  const { data, error, isLoading } = useFetch(`/api/posts/${id}`)

  return {
    post: data?.post,
    isLoading,
    isError: error,
  }
}
