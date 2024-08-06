import { giffyDb } from "../database/databaseOps"

export async function fetchGifInfoById(gifId) {
  //: string
  const query = `SELECT * FROM gif WHERE id = '${gifId}'`

  try {
    const info = await giffyDb.queryDatabase({ query })

    if (!info?.rows[0]) {
      //mejorar
      return null
    }

    return info
  } catch (err) {
    console.error("Error al consultar la base de datos", err)
    return { message: "Error al consultar la base de datos" }
  }
}
