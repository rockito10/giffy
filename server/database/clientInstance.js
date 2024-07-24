import pg from "pg"

// Configura el cliente de PostgreSQL
const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "giffy",
  password: "giffy",
  port: 5432,
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

/**
 * Ejecuta una consulta en la base de datos
 * @param {string} query - Consulta a ejecutar
 * @returns {Promise<pg.QueryResult>} - Resultado de la consulta
 */

async function queryDatabase(query) {
  //: string
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
