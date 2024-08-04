import { giffyDb } from "./clientInstance"

export async function getGifInfoById(gifId) {
  //: string
  const query = `SELECT * FROM gif WHERE id = '${gifId}'`

  try {
    const info = await giffyDb.queryDatabase({ query })

    if (!info) {
      return null
    }
  } catch (err) {
    console.error("Error al consultar la base de datos", err)
    return { message: "Error al consultar la base de datos" }
  }
}
