import { useQuery } from "@tanstack/react-query"
import type { MappedGif } from "../types/types"

const getGifById = (id: string | undefined) =>
  fetch(`/api/search/gif/${id}`).then((res) => res.json())

export function useGetGifById(id: string | undefined) {
  const { data, isLoading, error } = useQuery<MappedGif>({
    queryKey: [id],
    queryFn: () => getGifById(id),
  })

  return { data, isLoading, error }
}
