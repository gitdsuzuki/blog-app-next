import useSWR from 'swr'

const fetcherAdmin = async ([key, token]: [string, string]) => {
  return fetch(key, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  }).then((res) => res.json());
}

export const useFetchAdmin = (url: string, token: string) => {
    const { data, error, isLoading } = useSWR(
    [process.env.NEXT_PUBLIC_APP_BASE_URL + url, token],
    fetcherAdmin
  )

  return {
    data,
    error,
    isLoading,
  }
}