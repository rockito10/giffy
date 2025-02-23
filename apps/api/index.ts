import fs_og from 'node:fs'
import fs_prom from 'node:fs/promises'
import path from 'node:path'
import cors from 'cors'
import express from 'express'
import { json } from 'express'
import { db } from './src/config/db'
import { multerMiddleware } from './src/middlewares/multer.middleware'
import { giffyApiRouter } from './src/routes/app-routes'

// APP
const app = express()

// PRE-MIDDLEWARES
app.use(cors())
app.use(json()) // JSON es un middleware que parsea el body de las peticiones a JSON

// ROUTES
app.use('/api', giffyApiRouter)

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

// POST-MIDDLEWARES
// NOTHING HERE

// SERVER
const port = 3500

app.listen(port, () => {})

// ------------------------------------------------

// const express = require('express')
// const app = express()

// app.get('/', (req, res) => res.send('Express on Vercel'))

// app.listen(3500, () => console.log('Server ready on port 3500.'))

// module.exports = app
