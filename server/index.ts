import cors from "cors"
import express from "express"
import { giffyDb } from "./database/clientInstance"
import { getGifComments } from "./database/getGifComments"
import { getUserInfoFromDatabase } from "./database/getUserInfoFromDatabase"
import { getGifById } from "./gifsAPI/getGifById"
import { getGifsByQuery } from "./gifsAPI/getGifsByQuery"

const app = express()
const port = 3000
app.use(cors())

async function init () {
  await giffyDb.connectToDatabase()
}

init()

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

// Maneja la ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Hello Pepe!" })
})
  
// USERS

app.get(`/user/:userId`, async (req, res) => {
  const { userId } = req.params
  const userInfo = await getUserInfoFromDatabase(userId)
  res.json(userInfo)
})

// COMMENTS

app.get(`/comments/:gifId`, async (req, res) => {
  const { gifId } = req.params
  const gifInfo = await getGifComments(gifId)
  res.json(gifInfo)
})

// GIFS

app.get(`/search/:query/:next`, async (req, res) => {
  const { query, next } = req.params
  const queryData = await getGifsByQuery({ query, next })
  res.json(queryData)
})

app.get(`/search/:query`, async (req, res) => {
  const { query } = req.params
  const queryData = await getGifsByQuery({ query, next: "" })
  res.json(queryData)
})

app.get(`/gif/:gifId/`, async (req, res) => {
  const { gifId } = req.params
  const gifInfo = await getGifById({ id: gifId })
  res.json(gifInfo)
})

// Quiero cerrar la conexion de la base de datos al cerrar el servidor
app.on("close", async () => {
  await giffyDb.disconnectFromDatabase()
})
