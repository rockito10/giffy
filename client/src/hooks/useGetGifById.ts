import { useQuery } from "@tanstack/react-query"
import type { MappedGif } from "../types/types"
import { getGifById } from "../services/services"

export function useGetGifById(id: string) {
  return useQuery<MappedGif>({    queryKey: [id],    queryFn: () => getGifById(id),  })

}
