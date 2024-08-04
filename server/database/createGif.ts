import { giffyDb } from "./clientInstance"

interface Props {
  gifId: number
}

export async function createGif({ gifId }: Props) {
  //: string
  const query = `INSERT INTO gif (id, likes) VALUES ('${gifId}', 0)`

  try {
    await giffyDb.queryDatabase({ query })
  } catch (err) {
    console.error("Error al enviar a la base de datos", err)
  }
}
