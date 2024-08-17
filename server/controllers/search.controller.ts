import type { Request, Response } from "express"
import { TENOR_API } from "../config/env"
import { dataMapper, gifResponseMapper } from "../utils/gifResponseMapper"

// Por Query

export async function fetchGifsController(req: Request, res: Response) {
  const { query, next } = req.params
  const URL = `${TENOR_API.API_BASE_URL}/search?q=${query}&key=${TENOR_API.API_KEY}&limit=${20}&pos=${next}`

  try {
    const resp = await fetch(URL)
    const data = await resp.json()

    if (resp.status !== 200) {
      throw new Error("Error fetching gifs")
    }

    const mappedGifs = gifResponseMapper(data)
    return res.status(200).json(mappedGifs)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

// Por ID

export async function fetchGifByIdController(req: Request, res: Response) {
  const { gifId } = req.params
  const URL = `${TENOR_API.API_BASE_URL}/posts?key=${TENOR_API.API_KEY}&ids=${gifId}`

  try {
    const resp = await fetch(URL)
    const data = await resp.json()

    const mappedGif = dataMapper(data.results[0])

    return res.status(200).json(mappedGif)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}
