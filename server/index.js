import express from "express"
import cors from "cors"
import pg from "pg"

const app = express()
const port = 3000
app.use(cors())

// Configura el cliente de PostgreSQL
const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "giffy",
  password: "1234",
  port: 5432,
})

// Conéctate a la base de datos una sola vez al iniciar el servidor
client
  .connect()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos", err))

// Maneja la ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" })
})

// Maneja la solicitud para obtener un usuario específico
app.get(`/user/1`, async (req, res) => {
  try {
    const user = await client.query(`SELECT name, img FROM usuario WHERE id = '1'`)
    res.json(user.rows[0])
  } catch (err) {
    console.error("Error al consultar la base de datos", err)
    res.status(500).json({ message: "Error al consultar la base de datos" })
  }
})

// Maneja el cierre del servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

// Cierra la conexión al terminar el proceso
process.on("SIGINT", async () => {
  await client.end()
  console.log("Conexión a la base de datos cerrada")
  process.exit(0)
})
