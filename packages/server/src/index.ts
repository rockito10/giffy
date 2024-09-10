import cors from 'cors'
import express, { json } from 'express'
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware'
import { commentsRoutes } from './routes/comments.routes'
import { likesRoutes } from './routes/likes.routes'
import { searchRoutes } from './routes/search.routes'
import { userRoutes } from './routes/user.routes'

// APP
const app = express()

// PRE-MIDDLEWARES
app.use(cors())
app.use(json())

// ROUTES
app.get('/api', (_req, res) => res.json({ message: 'Hello Pepe!' }))
app.use('/api/user', userRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/likes', likesRoutes)

// POST-MIDDLEWARES
app.use(errorHandlerMiddleware)

// SERVER
const port = process.env.PORT ?? 3000

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})

// ------------------------------------------------

// app.use((req, res, next) => {
// 	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate') // HTTP 1.1.
// 	res.setHeader('Pragma', 'no-cache') // HTTP 1.0.
// 	res.setHeader('Expires', '0') // Proxies.
// 	next()
// })
