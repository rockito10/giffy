import express from "express"
import cors from "cors"
import { getUserInfoFromDatabase } from "./database/getUserInfoFromDatabase.js"
import { giffyDb } from "./database/clientInstance.js"
import { getGifComments } from "./database/getGifComments.js"

const app = express()
const port = 3000
app.use(cors())

await giffyDb.connectToDatabase()

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

// Maneja la ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Hello Pepe!" })
})

// Maneja la solicitud para obtener un usuario específico
app.get(`/user/:userId`, async (req, res) => {
  const { userId } = req.params
  const userInfo = await getUserInfoFromDatabase(userId)
  res.json(userInfo)
})

app.get(`/comments/:gifId`, async (req, res) => {
  const { gifId } = req.params
  const userInfo = await getGifComments(gifId)
  res.json(userInfo)
})

// Quiero cerrar la conexion de la base de datos al cerrar el servidor
app.on("close", async () => {
  await giffyDb.disconnectFromDatabase()
})
