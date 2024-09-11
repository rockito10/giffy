import { getUserController } from '@/controllers/user.controllers'
import { BAD_REQUEST } from '@/utils/status'
import { Router } from 'express'

export const userRoutes = Router()

userRoutes.use('/', (_req, _res, next) => {
	next(BAD_REQUEST('User ID is required'))
})

userRoutes.get('/:userId', getUserController)
