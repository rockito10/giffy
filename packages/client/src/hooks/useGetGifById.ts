import { getGifById } from '@/services/services'
import type { MappedGif } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

export function useGetGifById(id: string) {
	return useQuery<MappedGif>({
		queryKey: ['details', id],
		queryFn: () => getGifById(id),
	})
}
