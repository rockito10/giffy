import { giffyDb } from "./clientInstance"

export async function sendGifComment({ gifId, comment_info }) {
  const { comment_num, username, comment} = comment_info

  const query = `INSERT INTO comentario (num, gif_id, name, text) VALUES (${comment_num}, ${gifId}, '${username}', '${comment}')`

  try {
    await giffyDb.queryDatabase({ query })
  } catch (err) {
    console.error("Error al enviar a la base de datos", err)
  }
}
