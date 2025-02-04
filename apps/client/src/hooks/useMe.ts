import { getUser } from '@/services/services'
import type { UserInfo } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

export function useMe() {
	// const [username, setUserName] = useState<string | null>(
	// 	() => localStorage.getItem('username') ?? null,
	// )

	const setUserId = (id: string) => {
		localStorage.setItem('userId', id)
	}

	const setUserName = (username: string) => {
		localStorage.setItem('username', username)
		
	}

	const getUserId = () => {
		return localStorage.getItem('userId') ?? '1'
	}

	const getUserName = () => {
		return localStorage.getItem('username')
	}

	const username = localStorage.getItem('username')

	const { data } = useQuery<UserInfo>({
		queryKey: ['me'],
		queryFn: () => getUser(getUserId()),
	})

	return {
		// username: data?.user_name,
		avatar: data?.avatar,
		id: data?.user_id,
		setUserId,
		getSavedUserId: getUserId,
		setUserName,
		getUserName,
		username,
	}
}
