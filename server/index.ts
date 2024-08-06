import cors from "cors"
import express from "express"
import { giffyDb } from "./database/databaseOps"

// Routes
import { commentsRoutes } from "./routes/comments.routes"
import { searchRoutes } from "./routes/search.routes"
import { userRouter } from "./routes/user.routes"

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

async function init() {
  await giffyDb.connectToDatabase()
}

init()

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

// -------------------------------------

app.get("/", (req, res) => {
  res.json({ message: "Hello Pepe!" })
})

// ROUTES
app.use("/api/user", userRouter)
app.use("/api/search", searchRoutes)
app.use("/api/comments", commentsRoutes)

// -------------------------------------

app.on("close", async () => {
  await giffyDb.disconnectFromDatabase()
})
