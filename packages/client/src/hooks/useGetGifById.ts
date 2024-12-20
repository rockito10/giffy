import { getGifById } from '@/services/services'
import type { Gif } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

export function useGetGifById(id: string) {
	return useQuery<Gif>({
		queryKey: ['details', id],
		queryFn: () => getGifById(id),
	})
}
