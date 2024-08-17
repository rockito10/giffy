import cors from "cors"
import express from "express"

// Routes
import { userRouter } from "./routes/user.routes"
import { searchRoutes } from "./routes/search.routes"
import { commentsRoutes } from "./routes/comments.routes"
import { likesRoutes } from "./routes/likes.routes"

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

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
app.use("/api/likes", likesRoutes)

// -------------------------------------

// app.on("close", async () => {
//   await giffyDb.disconnectFromDatabase()
// })
