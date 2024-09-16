import { getGifById } from '@/services/services'
import type { ListOfGifs } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

export function useGetGifById(id: string) {
	return useQuery<ListOfGifs>({
		queryKey: ['details', id],
		queryFn: () => getGifById(id),
	})
}
