import { Router } from "express"
import { getCommentsController,sendCommentController } from "../controllers/movies.controller"

export const commentsRouter = Router()

commentsRouter.get("/:gifId", getCommentsController)
commentsRouter.post("/:gifId",sendCommentController )
