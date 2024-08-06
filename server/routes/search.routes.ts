import { Router } from "express"
import { getGifByIdController, getGifsController } from "../controllers/search.controller"

export const searchRoutes = Router()

searchRoutes.get("/:query/:next", getGifsController)
searchRoutes.get("/:query", getGifsController)
searchRoutes.get("/:gifId", getGifByIdController)
