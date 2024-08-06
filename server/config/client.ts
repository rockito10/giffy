import pg from "pg"
import { DB } from "../config/env"

// Configura el cliente de PostgreSQL
const { USER, HOST, DATABASE, PASSWORD, PORT } = DB

export const client = new pg.Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: Number(PORT),
})
