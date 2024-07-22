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

const res = await client.query("SELECT * FROM USUARIO", ["Hello world!"])
console.log(res)
console.log(res.rows[0].message) // Hello world!
await client.end()
