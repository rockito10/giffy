import { useAuth } from '@/hooks/useAuth'
import { MainLayout } from '@/layouts/MainLayout'
import { Suspense, lazy } from 'react'
import { Route, Switch } from 'wouter'
import { ProtectedRoutes } from './ProtectedRoutes'

// Pages
const HomePage = lazy(() => import('../pages/HomePage'))
const GifsDetails = lazy(() => import('../pages/GifDetails'))
const SearchPage = lazy(() => import('../pages/SearchPage'))
const Page404 = lazy(() => import('../pages/Page404'))
const UploadPage = lazy(() => import('../pages/UploadPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))

export function AppRoutes() {
	const { isAuthenticated } = useAuth()

	return (
		<MainLayout>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route component={HomePage} path="/" />
					<Route component={SearchPage} path="/search/:query?" />
					<Route component={GifsDetails} path="/gif/:id" />
					<Route component={LoginPage} path="/login" />

					<ProtectedRoutes isAuthenticated={isAuthenticated}>
						<Route component={UploadPage} path="/upload" />
					</ProtectedRoutes>

					{/* ERROR 404 */}
					<Route component={Page404} />
				</Switch>
			</Suspense>
		</MainLayout>
	)
}
