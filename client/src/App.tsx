import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppRoutes } from "./routes/App.routes"
import { GiffyContextProvider } from "./contexts/GiffyContext"

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
