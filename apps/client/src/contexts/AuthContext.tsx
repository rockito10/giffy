// CREAR CONTEXTO AUTH
import { useMe } from '@/hooks/useMe'
import { createContext, useState } from 'react'

type AuthContextType = {
	isAuthenticated: boolean
	login: (id: string, username: string) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(
		() => !!localStorage.getItem('isAuthenticated'),
	)
	const { setUserId, setUserName } = useMe()

	const login = (id: string, username: string) => {
		setUserId(id)
		setUserName(username)
		setIsAuthenticated(true)

		localStorage.setItem('isAuthenticated', JSON.stringify(true))
		location.href = '/home'
	}

	const logout = () => {
		setIsAuthenticated(false)
		setUserId('')
		setUserName('')
		localStorage.setItem('isAuthenticated', JSON.stringify(false))
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
