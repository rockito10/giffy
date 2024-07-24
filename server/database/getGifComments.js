import { giffyDb } from "./clientInstance.js"

export async function getGifComments(gifId) {
  //: string
  const QUERY = `SELECT num, gif_id, usuario.name, text, img FROM comentario JOIN usuario ON usuario.name = comentario.name WHERE gif_id = '${gifId}'`

  try {
    const comments = await giffyDb.queryDatabase(QUERY)

    const mappedComments = comments.rows.map((comment) => {
      return {
        numOfComment: comment.num,
        gifId: comment.gif_id,
        username: comment.name,
        comment: comment.text,
        avatar: comment.img,
      }
    })

    if (!comments) {
      return null
    }

    return mappedComments
  } catch (err) {
    console.error("Error al consultar la base de datos", err)
    return { message: "Error al consultar la base de datos" }
  }
}
