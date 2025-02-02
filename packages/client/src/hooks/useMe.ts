import { getUser } from '@/services/services'
import type { UserInfo } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

export function useMe() {
	const setUserId = (id: string) => {
		localStorage.setItem('userId', id)
	}

	const getUserId = () => {
		return localStorage.getItem('userId') ?? '1'
	}

	const { data } = useQuery<UserInfo>({
		queryKey: ['me'],
		queryFn: () => getUser(getUserId()),
	})

	return {
		username: data?.user_name,
		avatar: data?.avatar,
		id: data?.user_id,
		setUserId,
		getSavedUserId: getUserId,
	}
}
