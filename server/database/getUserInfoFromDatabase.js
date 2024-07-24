import { giffyDb } from "./clientInstance.js"

export async function getUserInfoFromDatabase(userId) {
  //: string
  const QUERY = `SELECT id, name, img FROM usuario WHERE id = '${userId}'`

  try {
    const userInfo = await giffyDb.queryDatabase(QUERY)

    if (!userInfo) {
      return null
    }

    return userInfo.rows[0]
  } catch (err) {
    console.error("Error al consultar la base de datos", err)
    return { message: "Error al consultar la base de datos" }
  } 
}
