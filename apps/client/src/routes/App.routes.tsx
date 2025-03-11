import { MainLayout } from '@/layouts/MainLayout'
import { Suspense, lazy } from 'react'
import { Route, Switch } from 'wouter'
import { ProtectedRoute } from './ProtectedRoute'

// Pages
const HomePage = lazy(() => import('../pages/HomePage'))
const GifsDetails = lazy(() => import('../pages/GifDetails'))
const SearchPage = lazy(() => import('../pages/SearchPage'))
const Page404 = lazy(() => import('../pages/Page404'))
const UploadPage = lazy(() => import('../pages/UploadPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const UploadedGifsPage = lazy(() => import('../pages/UploadedGifsPage'))

export function AppRoutes() {
	return (
		<MainLayout>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					{/* Rutas protegidas */}

					<Route path="/" component={HomePage} />
					<Route path="/home" component={HomePage} />

					<Route path="/search/:query?" component={SearchPage} />
					<Route path="/gif/:id" component={GifsDetails} />
					<Route path="/login" component={LoginPage} />

					<ProtectedRoute path="/upload" component={UploadPage} />

					<ProtectedRoute path="/uploaded" component={UploadedGifsPage} />

					{/* Ruta 404 */}
					{/* <Route component={Page404} /> */}
					<Route component={Page404} />
				</Switch>
			</Suspense>
		</MainLayout>
	)
}
