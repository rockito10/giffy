import { getLikes, postLikes } from '@/controllers/likes.controllers'
import { BAD_REQUEST } from '@/utils/status'
import { Router } from 'express'

export const likesRoutes = Router()

likesRoutes.use('/', (_req, _res, next) => {
	next(BAD_REQUEST('GifId is required'))
})

likesRoutes.get('/:gifId', getLikes) // -->
likesRoutes.post('/:gifId', postLikes)
