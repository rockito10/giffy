import cors from 'cors'
import express from 'express'
import { json } from 'express'
// import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware'
import { commentsRoutes } from './routes/comments.routes'
import { likesRoutes } from './routes/likes.routes'
import { searchRoutes } from './routes/search.routes'
import { uploadRoutes } from './routes/upload.routes'
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

app.get('/api/upload', async (req, res) => {
	res.status(200).json('si')
})

app.post(
	'/api/upload',
	multerMiddleware,

	async (req, res, next) => {
		const { file, body } = req
		const { title, description, tags, author, alt } = body

		if (!file) return

		const id = `giffy-${crypto.randomUUID()}`

		const response = await db.gif.create({
			data: {
				id,
				title,
				images: { gif: `uploads/${id}.gif` },
				description,
				tags: JSON.parse(tags),
				author,
				alt,
			},
		})

		fs.rename(`./uploads/${file.originalname}`, `./uploads/${id}.gif`)
			.then(() => {
				console.log('File renamed')
			})
			.catch((err) => {
				console.error('Error renaming file', err)
			})

		if (response) {
			return res.status(202).json({ message: 'Gif created' })
		}
		return res.status(500).json({ message: 'Error creating gif' })
	},
)

// POST-MIDDLEWARES
// app.use(errorHandlerMiddleware)

// SERVER
const port = 3000

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})

// ------------------------------------------------
