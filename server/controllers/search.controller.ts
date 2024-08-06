import { fetchGifById } from "../helpers/fetchGifById"
import { fetchGifsByQuery } from "../helpers/fetchGifsByQuery"

export async function getGifsController(req, res) {
  const { query, next } = req.params
  const queryData = await fetchGifById({ query, next })
  res.json(queryData)
}

export async function getGifByIdController(req, res) {
  const { gifId } = req.params
  const gifInfo = await fetchGifsByQuery({ gifId })
  res.json(gifInfo)
}
