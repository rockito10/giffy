import { Router } from 'express'
import { getGifByIdController, getSearchController } from '../controllers/search.controllers'

export const searchRoutes = Router()

searchRoutes.get('/:query', getSearchController)
searchRoutes.get('/gif/:gifId', getGifByIdController)
