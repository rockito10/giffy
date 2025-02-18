import { getGifById, getUser } from '@/services/services'
import type { UserInfo } from '@/types/types'
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

	const { data: authorData } = useQuery<UserInfo>({
		queryKey: ['gifAuthor', gifID],
		queryFn: () => getUser(gifData?.authorId as string),
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

	return { data: { gifData, authorData, likesData }, isLoading, error }
}
