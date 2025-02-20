import { Router } from 'express'
import { getTrendingController } from '../controllers/trending.controllers'

export const trendingRoutes = Router()

trendingRoutes.get('/', getTrendingController)
