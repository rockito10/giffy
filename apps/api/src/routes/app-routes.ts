import express from 'express'
// import { authRoutes } from './auth-routes'
// import { commentsRoutes } from './comments-routes'
// import { likesRoutes } from './likes-routes'
import { searchRoutes } from './search-routes'
// 
export const giffyApiRouter = express.Router()

giffyApiRouter.get('/', (_req, res) => {
	res.json({ message: 'Giffy API Online' })
})
// giffyApiRouter.use('/user', userRoutes)
giffyApiRouter.use('/search', searchRoutes)
// giffyApiRouter.use('/comments', commentsRoutes)
// giffyApiRouter.use('/likes', likesRoutes)
// giffyApiRouter.use('/auth/login', authRoutes)
// giffyApiRouter.use('/trending', trendingRoutes)
