// @ts-check

import express from "express"
import cors from "cors"
import pg from "pg"

const app = express()
const port = 3000
app.use(cors())

// const infoFromDataBase = {
//   id: 1,
//   name: "Pepe",
//   img: "https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg",
// }

const { Client } = pg

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "giffy",
  password: "1234",
  port: 5432,
})

client.connect()

// Enable CORS for all routes

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  })
})

const id = 1

app.get(`/user/${id}`, (req, res) => {

  const infoFromDataBase = client.query(
    `SELECT (id, name, img) FROM usuario WHERE id = '${id}'`,
  )

  res.send(infoFromDataBase)
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

await client.end()
