import { Router } from "express"
import { getCommentsController, sendCommentController, deleteCommentController } from "../controllers/comments.controller"

export const commentsRoutes = Router()

commentsRoutes.get("/:gifId", getCommentsController)
commentsRoutes.post("/:gifId", sendCommentController)
commentsRoutes.delete("/:gifId", deleteCommentController)
