import fs_og from 'node:fs'
import fs_prom from 'node:fs/promises'
import path from 'node:path'
import cors from 'cors'
import express, { json } from 'express'
import { db } from './config/db'
import { multerMiddleware } from './middlewares/multer.middleware'
// import { db } from './config/db'
// import { multerMiddleware } from './middlewares/multer.middleware'
import { giffyApiRouter } from './routes/app-routes'

// APP
const app = express()

// PRE-MIDDLEWARES
app.use(cors())
app.use(json()) // JSON es un middleware que parsea el body de las peticiones a JSON

// ROUTES
app.use('/api', giffyApiRouter)

app.get('/api/status', (_req, res) => {
	res.status(200).json({ message: 'Server is running' })
})

// Ruta para servir imágenes estáticas
app.get('/api/images/:gifId', (req, res) => {
	const { gifId } = req.params
	const imagePath = path.join(process.cwd(), 'public/images', `${gifId}.gif`)

	// Verificar si la imagen existe antes de enviarla
	if (fs_og.existsSync(imagePath)) {
		res.sendFile(imagePath)
	} else {
		res.status(404).json({ error: 'Gif not found' })
	}
})

app.post(
	'/api/upload',
	multerMiddleware,

	async (req, res, _next) => {
		const { file, body } = req
		const { title, description, tags, authorName, authorId, alt } = body

		if (!file) return

		const id = `giffy-${crypto.randomUUID()}`

		const response = await db.gif.create({
			data: {
				id,
				title,
				images: { gif: `/api/images/${id}` },
				description,
				tags: JSON.parse(tags),
				authorName,
				authorId,
				alt,
			},
		})

		fs_prom
			.rename(`./public/images/${file.originalname}`, `./public/images/${id}.gif`)
			.then(() => {
				// console.log('File renamed')
			})
			.catch((err) => {
				console.error('Error renaming file', err)
			})

		if (response) {
			return res.status(202).json({ message: 'Gif created', id })
		}
		return res.status(500).json({ message: 'Error creating gif' })
	},
)
export default app

// ------------------------------------------------------------------------

// // app.ts

// import express from 'express'
// // import userRouter from './routes/users-routes.js'

// const app = express()

// // Middlewares
// app.use(express.json())

// // Routes
// // app.use('/api', userRouter)
// //
// // API status

// app.get('/', (_req, res) => {
// 	res.status(200).json({ message: 'pepe' })
// })

// app.get('/api', (_req, res) => {
// 	res.status(200).json({ message: 'pepe2' })
// })

// export default app
