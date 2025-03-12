import { Router } from 'express'
import { getLikedGifs, getLikes, postLikes } from '../controllers/likes.controllers'

export const likesRoutes = Router()

likesRoutes.get('/:gifId', getLikes)
likesRoutes.post('/:gifId', postLikes)
likesRoutes.get('/user/:userID', getLikedGifs)
