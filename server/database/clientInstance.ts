import pg from "pg"
import { DB } from "../config/env"

// Configura el cliente de PostgreSQL
const { USER, HOST, DATABASE, PASSWORD, PORT } = DB

const client = new pg.Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: Number(PORT),
})

async function connectToDatabase() {
  try {
    await client.connect()
    console.log("Conectado a la base de datos")
  } catch (error) {
    console.error("Error al conectar a la base de datos", error)
  }
}

async function disconnectFromDatabase() {
  try {
    await client.end()
    console.log("Desconectado de la base de datos")
  } catch (error) {
    console.error("Error al desconectar de la base de datos", error)
  }
}

interface Params {
  query: string
}

async function queryDatabase({ query }: Params) {
  try {
    const result = await client.query(query)
    return result
  } catch (error) {
    console.error("Error al ejecutar la consulta", error)
  }
}

export const giffyDb = {
  connectToDatabase,
  disconnectFromDatabase,
  queryDatabase,
}
