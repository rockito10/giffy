import { uploadGifController } from '@/controllers/upload.controllers'
import { Router } from 'express'
import { userRoutes } from './user.routes'

export const uploadRoutes = Router()

userRoutes.get('/', uploadGifController)