import { Router } from 'express'
import { getUserController } from '../controllers/user-controllers'
import { getUserGifsController } from '../controllers/user-controllers'

export const userRoutes = Router()

userRoutes.get('/:userID', getUserController)
userRoutes.get('/:userID/gifs', getUserGifsController)
