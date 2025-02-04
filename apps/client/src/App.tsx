import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GiffyContextProvider } from './contexts/GiffyContext'
import { AppRoutes } from './routes/App.routes'

const queryClient = new QueryClient()

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GiffyContextProvider>
				<AppRoutes />
			</GiffyContextProvider>
		</QueryClientProvider>
	)
}
