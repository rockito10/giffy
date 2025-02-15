import { useLocation } from 'wouter'

interface ProtectedRoutesProps {
	isAuthenticated: boolean
	children: React.ReactNode
}

export function ProtectedRoutes({ isAuthenticated, children }: ProtectedRoutesProps) {
	const [_, setLocation] = useLocation()

	if (!isAuthenticated) {
		setLocation('/login')
		return null
	}

	return <>{children}</>
}
