import { getGifByIdController, getSearchController } from '@/controllers/search.controllers'
import { BAD_REQUEST } from '@/utils/status'
import { Router } from 'express'

export const searchRoutes = Router()

// searchRoutes.use('/', (_req, _res, next) => {
// 	next(BAD_REQUEST('Query is required'))
// })

searchRoutes.get('/:query', getSearchController)
// searchRoutes.get('/:query/:next', getListOfGifsController)
// searchRoutes.get('/:query/:next/', getListOfGifsController)
// searchRoutes.get('/:query', getListOfGifsController)
// searchRoutes.get('/:query/', getListOfGifsController)

searchRoutes.get('/gif/:gifId', getGifByIdController)
