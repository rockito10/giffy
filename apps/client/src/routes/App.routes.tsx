import { MainLayout } from '@/layouts/MainLayout'
import { Suspense, lazy } from 'react'
import { Route, Switch } from 'wouter'

// Pages
const HomePage = lazy(() => import('../pages/HomePage'))
const GifsDetails = lazy(() => import('../pages/GifDetails'))
const SearchPage = lazy(() => import('../pages/SearchPage'))
const Page404 = lazy(() => import('../pages/Page404'))
const UploadPage = lazy(() => import('../pages/UploadPage'))

export function AppRoutes() {
	return (
		<MainLayout>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route component={HomePage} path="/" />
					<Route component={SearchPage} path="/search/:query?" />
					<Route component={GifsDetails} path="/gif/:id" />
					<Route component={UploadPage} path="/upload" />

					{/* ERROR 404 */}
					<Route component={Page404} />
				</Switch>
			</Suspense>
		</MainLayout>
	)
}
