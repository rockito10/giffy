import { getUserController } from '../controllers/user-controllers'
import { Router } from 'express'

export const userRoutes = Router()

userRoutes.get('/:userID', getUserController)
