import { lazy, Suspense } from "react"
import { Route, Router } from "wouter"
import { Form } from "../components/Form"
import { MainLayout } from "../layouts/MainLayout"

// Pages
const HomePage = lazy(() => import("../pages/HomePage"))
const GifsDetails = lazy(() => import("../pages/GifDetails"))
const SearchPage = lazy(() => import("../pages/SearchPage"))

export function AppRoutes() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <Form />
            <Route component={HomePage} path="/" />
            <Route component={SearchPage} path="/search/:query" />
          </div>
          <Route component={GifsDetails} path="/gif/:id" />
        </Suspense>
      </MainLayout>
    </Router>
  )
}
