import { getGifByIdController, getSearchController } from '../controllers/search.controllers'
import { Router } from 'express'

export const searchRoutes = Router()

searchRoutes.get('/:query', getSearchController)
searchRoutes.get('/gif/:gifId', getGifByIdController)
