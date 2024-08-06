import { giffyDb } from "../database/databaseOps"

export async function postGifComment({ gifId, comment_info }) {
  const { username, commentText } = comment_info

  try {
    const queryComNum = `SELECT MAX(num) FROM comentario WHERE gif_id = '${gifId}'`
    const comment_num = await giffyDb.queryDatabase({ query: queryComNum })

    if (!comment_num) {
      const query = `INSERT INTO comentario (num, gif_id, name, text) VALUES (0, '${gifId}', '${username}', '${commentText}')`
      await giffyDb.queryDatabase({ query })
    } else {
      const query = `INSERT INTO comentario (num, gif_id, name, text) VALUES (${comment_num.rows[0].max + 1}, '${gifId}', '${username}', '${commentText}')`
      await giffyDb.queryDatabase({ query })
    }
  } catch (err) {
    console.error("Error al enviar a la base de datos", err)
  }
}
