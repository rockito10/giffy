import { getGifById } from '@/services/services'
import type { Gif } from '@giffy/types'
import { useQuery } from '@tanstack/react-query'

export function useGetGifById(gifID: string, userID: string) {
	const {
		data: gifData,
		isLoading,
		error,
	} = useQuery<Gif>({
		queryKey: ['details', gifID],
		queryFn: () => getGifById(gifID),
	})

	const { data: likesData } = useQuery({
		queryFn: () => {
			return fetch(`/api/likes/${gifID}?userID=${userID}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => res.json())
		},
		queryKey: ['LIKES', gifID],
	})

	return { data: { gifData, likesData }, isLoading, error }
}
