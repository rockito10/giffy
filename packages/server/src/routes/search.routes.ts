import { getGifByIdController, getSearchController } from '@/controllers/search.controllers'
import { BAD_REQUEST } from '@/utils/status'
import { Router } from 'express'

export const searchRoutes = Router()

// searchRoutes.use('/', (_req, _res, next) => {
// 	next(BAD_REQUEST('Query is required'))
// })

// Promise.allSettled([Promise.resolve(1), Promise.resolve(2)]).then(console.log)

searchRoutes.get('/:query', getSearchController)


searchRoutes.get('/gif/:gifId', getGifByIdController)
