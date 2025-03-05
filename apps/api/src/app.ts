import fs_og from 'node:fs'
import path from 'node:path'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import express, { json } from 'express'
import multer from 'multer'
import { db } from './config/db'
// import { db } from './config/db'
// import { multerMiddleware } from './middlewares/multer.middleware'
// import { db } from './config/db'
// import { multerMiddleware } from './middlewares/multer.middleware'
import { giffyApiRouter } from './routes/app-routes'

// APP
const app = express()

const allowedOrigins = ['http://localhost:5173']

const ORIGIN = process.env.ORIGIN

if (ORIGIN) {
	allowedOrigins.push(ORIGIN)
}
;(async () => {
	// Configuration
	cloudinary.config({
		cloud_name: 'dm5rzwoa3',
		api_key: '844888962214969',
		api_secret: '0L-zh1dwqiY-scDAS3jn74JvROc', // Click 'View API Keys' above to copy your API secret
	})

	// Upload an image

	// console.log(uploadResult)

	// // Optimize delivery by resizing and applying auto-format and auto-quality
	// const optimizeUrl = cloudinary.url('shoes', {
	// 	fetch_format: 'auto',
	// 	quality: 'auto',
	// })

	// console.log(optimizeUrl)

	// // Transform the image: auto-crop to square aspect_ratio
	// const autoCropUrl = cloudinary.url('shoes', {
	// 	crop: 'auto',
	// 	gravity: 'auto',
	// 	width: 500,
	// 	height: 500,
	// })

	// console.log(autoCropUrl)
})()

// PRE-MIDDLEWARES

app.use(
	cors({
		origin: allowedOrigins,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		exposedHeaders: ['Authorization'],
		credentials: true,
	}),
)

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

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), async (req, res, _next) => {
	const { file, body } = req
	const { title, description, tags, authorName, authorId, alt } = body

	if (!file) {
		return res.status(400).json({ message: 'No file uploaded' })
	}

	const id = `giffy-${crypto.randomUUID()}`

	try {
		// Subir el archivo recibido a Cloudinary

		cloudinary.uploader
			.upload_stream(
				{ resource_type: 'image', folder: 'gifs', public_id: id },
				async (error, result) => {
					if (error) {
						console.log('Error uploading image', error)
						return res.status(500).json({ message: 'Error creating gif' })
					}

					// Guardar en la base de datos la URL de Cloudinary
					const response = await db.gif.create({
						data: {
							id,
							title,
							images: { gif: result?.secure_url }, // URL de Cloudinary
							description,
							tags: JSON.parse(tags),
							authorName,
							authorId,
							alt,
						},
					})

					if (response) {
						return res.status(202).json({ message: 'Gif created', id })
					}
				},
			)
			.end(file.buffer)
	} catch (error) {
		console.log('Error uploading image', error)
		return res.status(500).json({ message: 'Error creating gif' })
	}
})
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
