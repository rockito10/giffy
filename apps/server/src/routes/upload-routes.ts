import { uploadGifController } from '@/controllers/upload.controllers'
import { multerMiddleware } from '@/middlewares/multer.middleware'
import { Router } from 'express'
import { userRoutes } from './user-routes'

export const uploadRoutes = Router()

userRoutes.post('/', multerMiddleware, uploadGifController)
