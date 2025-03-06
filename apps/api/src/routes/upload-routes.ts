import { Router } from 'express'
import { uploadGifController } from '../controllers/upload.controllers'
import { multerMiddleware } from '../middlewares/multer.middleware'

export const uploadRoutes = Router()

uploadRoutes.post('/', multerMiddleware, uploadGifController)
