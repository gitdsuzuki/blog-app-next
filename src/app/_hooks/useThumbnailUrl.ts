import useSWR from 'swr'
import { supabase } from '@/utils/supabase'

const fetcher = async (key: string): Promise<string | null> => {

  const { data } = await supabase.storage
    .from('post-thumbnail')
    .getPublicUrl(key);
  
    return data?.publicUrl ?? null;
}

export const useThumbnailUrl = (thumbnailImageKey: string | null | undefined) => {
  const { data, error, isLoading } = useSWR<string | null>(
    thumbnailImageKey ?? null,
    fetcher,
  )

  return {
    thumbnailImageUrl: data,
    error,
    isLoading,
  }
}