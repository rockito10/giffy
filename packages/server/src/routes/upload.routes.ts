import { uploadGifController } from '@/controllers/upload.controllers'
import { Router } from 'express'
import { userRoutes } from './user.routes'

export const uploadRoutes = Router()

userRoutes.get('/', (_req, res) => {
  res.json({ message: 'asdfdasfdasfdsa!' })
})
userRoutes.post('/', uploadGifController)
