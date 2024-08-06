import { fetchGifComments } from "../helpers/fetchGifComments"
import { fetchGifInfoById } from "../helpers/fetchGifInfoById"
import { postGif } from "../helpers/postGif"
import { postGifComment } from "../helpers/postGifComment"

export async function getCommentsController(req, res) {
  const { gifId } = req.params
  const gifInfo = await fetchGifComments(gifId)
  res.json(gifInfo)
}

export async function sendCommentController(req, res) {
  const { gifId } = req.params
  const comment_info = req.body

  const gifExists = await fetchGifInfoById({ gifId })

  if (!gifExists) {
    //mejorar
    await postGif({ gifId })
  }
  const gifInfo = await postGifComment({ gifId, comment_info })

  res.status(201).json(gifInfo)
}
