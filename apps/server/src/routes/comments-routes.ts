import {
	deleteCommentController,
	getCommentsController,
	sendCommentController,
} from '@/controllers/comments.controllers'
import { Router } from 'express'

export const commentsRoutes = Router()

commentsRoutes.get('/:gifId', getCommentsController)
commentsRoutes.post('/:gifId', sendCommentController)
commentsRoutes.delete('/:gifId', deleteCommentController)
