import dotenv from "dotenv"

dotenv.config()

console.log(process.env)

const { TENOR_API_KEY } = process.env

export { TENOR_API_KEY }
