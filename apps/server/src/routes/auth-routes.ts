import { Router } from 'express'
import { postLogin } from '../controllers/login.controllers'

export const authRoutes = Router()

authRoutes.post('/', postLogin)
