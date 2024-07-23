// @ts-check

import pg from "pg"
const { Client } = pg

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "giffy",
  password: "giffy",
  port: 5432,
})

client.connect()

const res = await client.query("SELECT * FROM usuario NATURAL JOIN comentario WHERE name = 'pepe'")
// console.log(res)
console.log(res["rows"])
await client.end()
