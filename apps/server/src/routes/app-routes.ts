import { Router } from 'express'
import { commentsRoutes } from './comments-routes'
import { likesRoutes } from './likes-routes'
import { searchRoutes } from './search-routes'
import { userRoutes } from './user-routes'

export const giffyApiRouter = Router()

giffyApiRouter.get('/', (_req, res) => {
	res.json({ message: 'Giffy API Online' })
})
giffyApiRouter.use('/user', userRoutes)
giffyApiRouter.use('/search', searchRoutes)
giffyApiRouter.use('/comments', commentsRoutes)
giffyApiRouter.use('/likes', likesRoutes)
