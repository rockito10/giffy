import { createGif } from "../database/createGif"
import { getGifComments } from "../database/getGifComments"
import { getGifInfoById } from "../database/getGifInfoById"
import { sendGifComment } from "../database/sendGifComment"
// cambiar carpetas para send y get??

export async function getCommentsController(req, res) {
  const { gifId } = req.params
  const gifInfo = await getGifComments(gifId)
  res.json(gifInfo)
}

export async function sendCommentController(req, res) {
  const { gifId } = req.params
  const comment_info = req.body

  const gifExists = await getGifInfoById({ gifId })

  if (!gifExists) {
    //mejorar
    await createGif({ gifId })
  }
  const gifInfo = await sendGifComment({ gifId, comment_info })

  res.status(201).json(gifInfo)
}
