import { Router } from "express"
import { fetchGifByIdController, fetchGifsController } from "../controllers/search.controller"

export const searchRoutes = Router()

searchRoutes.get("/gif/:gifId", fetchGifByIdController)

searchRoutes.get("/:query", fetchGifsController)
searchRoutes.get("/:query/:next", fetchGifsController)
