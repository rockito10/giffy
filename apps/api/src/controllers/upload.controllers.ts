import { v2 as cloudinary } from 'cloudinary'
import type { Request, Response } from 'express'
import { db } from '../config/db'

export async function uploadGifController(req: Request, res: Response) {
	const { file, body } = req
	const { title, description, tags, authorName, authorId, alt } = body

	if (!file) {
		return res.status(400).json({ message: 'No file uploaded' })
	}

	const id = `giffy-${crypto.randomUUID()}`

	try {
		const uploadOnGiffyDB = async (error, result) => {
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
		}
		// Subir el archivo recibido a Cloudinary

		cloudinary.uploader
			.upload_stream({ resource_type: 'image', folder: 'gifs', public_id: id }, uploadOnGiffyDB)
			.end(file.buffer)
	} catch (error) {
		console.log('Error uploading image', error)
		return res.status(500).json({ message: 'Error creating gif' })
	}
}
