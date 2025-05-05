import useSWR from 'swr'

const fetcher = async (key: string) => {
  return fetch(key).then((res) => res.json());
}

export const useFetch = (url: string) => {
    const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_APP_BASE_URL + url,
    fetcher
  )

  return {
    data,
    error,
    isLoading,
  }
}