import { getLikedGifs, getLikes, postLikes } from '../controllers/likes.controllers'
import { Router } from 'express'

export const likesRoutes = Router()

likesRoutes.get('/:gifId', getLikes)
likesRoutes.post('/:gifId', postLikes)
likesRoutes.get('/user/:userID', getLikedGifs)
