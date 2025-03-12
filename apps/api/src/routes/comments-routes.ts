import { Router } from 'express'
import {
	deleteCommentController,
	getCommentsController,
	sendCommentController,
} from '../controllers/comments.controllers'

export const commentsRoutes = Router()

commentsRoutes.get('/:gifId', getCommentsController)
commentsRoutes.post('/:gifId', sendCommentController)
commentsRoutes.delete('/:gifId', deleteCommentController)
