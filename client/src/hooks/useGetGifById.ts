import { useQuery } from "@tanstack/react-query"
import { getGifById } from "../services/services"
import type { MappedGif } from "../types/types"

export function useGetGifById(id: string) {
  return useQuery<MappedGif>({
    queryKey: ["details", id],
    queryFn: () => getGifById(id),
  })
}
