import cors from 'cors'
import express, { json } from 'express'
import { db } from './config/db'
// import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware'
import { commentsRoutes } from './routes/comments.routes'
import { likesRoutes } from './routes/likes.routes'
import { searchRoutes } from './routes/search.routes'
import { userRoutes } from './routes/user.routes'

// APP
const app = express()

// PRE-MIDDLEWARES
app.use(cors())
app.use(json()) // JSON es un middleware que parsea el body de las peticiones a JSON

// app.use((req, res, next) => {
// 	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate') // HTTP 1.1.
// 	res.setHeader('Pragma', 'no-cache') // HTTP 1.0.
// 	res.setHeader('Expires', '0') // Proxies.
// 	next()
// })

// ROUTES
app.get('/api', (_req, res) => res.json({ message: 'Hello Pepe!' }))
app.use('/api/user', userRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/likes', likesRoutes)
// app.use('/api/upload', uploadRoutes)
app.post('/api/upload', async (_req, res) => {
	const { gif, title, description, tags } = _req.body

	console.log(gif, title, description, tags)

	const response = await db.custom_gif.create({
		data: {
			gif_id: `giffy-${crypto.randomUUID()}`,
			title,
			url: 'https://media.tenor.com/-Y2YOay3_JoAAAAC/its-friday-dancing.gif',
			description,
			tags,
		},
	})

	if (response) {
		return res.status(202).json({ message: 'Gif created' })
	}
	return res.status(500).json({ message: 'Error creating gif' })
})

// POST-MIDDLEWARES
// app.use(errorHandlerMiddleware)

// SERVER
const port = 3000

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})

// ------------------------------------------------
