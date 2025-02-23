import { getUser } from '@/services/services'
import type { UserInfo } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

export function useMe() {
	const getUserId = () => localStorage.getItem('userId')
	const getUserName = () => localStorage.getItem('username')

	const setUserId = (id: string) => localStorage.setItem('userId', id)
	const setUserName = (username: string) => localStorage.setItem('username', username)

	const { data } = useQuery<UserInfo>({
		queryKey: ['me'],
		queryFn: () => getUser(getUserId() || ''), // Evitar pasar `undefined`
	})

	return {
		avatar: data?.avatar,
		// id: data?.user_id,
		setUserId,
		getSavedUserId: getUserId,
		setUserName,
		getUserName,
	}
}
