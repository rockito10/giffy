import { lazy, Suspense } from "react"
import { Route, Switch } from "wouter"
import { MainLayout } from "../layouts/MainLayout"

// Pages
const HomePage = lazy(() => import("../pages/HomePage"))
const GifsDetails = lazy(() => import("../pages/GifDetails"))
const SearchPage = lazy(() => import("../pages/SearchPage"))
const Page404 = lazy(() => import("../pages/Page404"))

export function AppRoutes() {
  return (
    <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
      <Switch >
        
          <Route component={HomePage} path="/" />
          <Route component={SearchPage} path="/search/:query" />
          <Route component={GifsDetails} path="/gif/:id" />

          {/* ERROR 404 */}
          <Route component={Page404} />
    </Switch>
        </Suspense>
      </MainLayout>
  )
}
