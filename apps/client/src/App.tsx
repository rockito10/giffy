import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { GiffyContextProvider } from './contexts/GiffyContext'
import { AppRoutes } from './routes/App.routes'

const queryClient = new QueryClient()

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<GiffyContextProvider>
					<AppRoutes />
				</GiffyContextProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}
