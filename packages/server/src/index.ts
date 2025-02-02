import fs from 'node:fs/promises'
import cors from 'cors'
import express from 'express'
import { json } from 'express'
import { db } from './config/db'
import { multerMiddleware } from './middlewares/multer.middleware'
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

app.get('/api/pepe', async (req, res) => {
	const response = await db.custom_gif.findUnique({
		where: {
			gif_id: 'd1d9e541-e97e-4420-80ca-3e00fed9da9d',
		},
	})

	if (!response) return res.status(404).json({ message: 'Gif not found' })

	res.status(200).json(response)
})

app.post('/api/upload', multerMiddleware, async (req, res) => {
	const { file, body } = req
	const { title, description, tags } = body

	if (!file) return

	const id = `giffy-${crypto.randomUUID()}`

	const response = await db.custom_gif.create({
		data: {
			gif_id: id,
			title,
			url: `uploads/${id}.gif`,
			description,
			tags: JSON.parse(tags),
		},
	})

	console.log(response)

	fs.rename(`./uploads/${file.originalname}`, `./uploads/${id}.gif`)
		.then(() => {
			console.log('File renamed')
		})
		.catch((err) => {
			console.error('Error renaming file', err)
		})

	//chequear esto, puede que cause problemas
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
