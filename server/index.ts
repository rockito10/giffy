import cors from "cors"
import express from "express"
import { giffyDb } from "./database/clientInstance"
import { getGifComments } from "./database/getGifComments"
import { getUserInfoFromDatabase } from "./database/getUserInfoFromDatabase"
import { sendGifComment } from "./database/sendGifComment"
import { getGifById } from "./gifsAPI/getGifById"
import { getGifsByQuery } from "./gifsAPI/getGifsByQuery"
import { commentsRouter } from "./routes/comments"

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

async function init() {
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

app.get(`/api/user/:userId`, async (req, res) => {
  const { userId } = req.params

  const userInfo = await getUserInfoFromDatabase(userId)
  res.json(userInfo)
})

// // COMMENTS
app.use("/api/comments", commentsRouter)
// app.get(`/comments/:gifId`, async (req, res) => {
//   const { gifId } = req.params
//   const gifInfo = await getGifComments(gifId)
//   res.json(gifInfo)
// })

// app.post(`/comments/:gifId`, async (req, res) => {
//   const { gifId } = req.params

//   const comment_info = req.body
//   console.log("Body:", req.body)

//   const gifExists = await getGifById({ gifId })
//   const gifInfo = await sendGifComment({ gifId, comment_info })

//   res.status(201).json(gifInfo)
// })

// GIFS

app.get(`/api/search/:query/:next`, async (req, res) => {
  const { query, next } = req.params
  const queryData = await getGifsByQuery({ query, next })
  res.json(queryData)
})

app.get(`/api/search/:query`, async (req, res) => {
  const { query } = req.params
  const queryData = await getGifsByQuery({ query, next: "" })
  res.json(queryData)
})

app.get(`/api/gif/:gifId/`, async (req, res) => {
  const { gifId } = req.params
  const gifInfo = await getGifById({ gifId })
  res.json(gifInfo)
})

// app.set()

// Quiero cerrar la conexion de la base de datos al cerrar el servidor
app.on("close", async () => {
  await giffyDb.disconnectFromDatabase()
})

// rutas y controllers en carpetas separadas
