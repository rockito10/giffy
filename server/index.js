import cors from "cors"
import express from "express"
import { giffyDb } from "./database/clientInstance.js"
import { getGifComments } from "./database/getGifComments.js"
import { getUserInfoFromDatabase } from "./database/getUserInfoFromDatabase.js"
import { getSearchOnApi } from "./gifsAPI/getSearchOnApi.js"

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
  const gifInfo = await getGifComments(gifId)
  res.json(gifInfo)
})

app.get(`/search/:query/:next`, async (req, res) => {
  const { query, next } = req.params
  const queryData = await getSearchOnApi({ query, next })
  res.json(queryData)
})

app.get(`/search/:query`, async (req, res) => {
  const { query } = req.params
  const queryData = await getSearchOnApi({ query, next: "" })
  res.json(queryData)
})

// app.get('/fruit/:fruitName/:fruitColor', function(req, res) {
//   var data = {
//       "fruit": {
//           "apple": req.params.fruitName,
//           "color": req.params.fruitColor
//       }
//   };

//   send.json(data);
// });

// Quiero cerrar la conexion de la base de datos al cerrar el servidor
app.on("close", async () => {
  await giffyDb.disconnectFromDatabase()
})
