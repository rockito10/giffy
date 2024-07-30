import dotenv from "dotenv"

dotenv.config()

const { USER, HOST, DATABASE, PASSWORD, PORT, TENOR_API_KEY, TENOR_API_BASE_URL } = process.env

const DB = {
  USER,
  HOST,
  DATABASE,
  PASSWORD,
  PORT,
}

const TENOR_API = {
  API_KEY: TENOR_API_KEY,
  API_BASE_URL: TENOR_API_BASE_URL,
}

export { TENOR_API, DB }
