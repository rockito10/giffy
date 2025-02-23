import fs from 'node:fs/promises'
import type { Request, Response } from 'express'
import { db } from '../config/db'

// interface Gif {
// 	gif: string
// 	title: string
// 	description: string
// 	tags: string[]
// }

export async function uploadGifController(req: Request, res: Response) {
	const { file, body } = req
	const { title, description, tags, authorId, alt, authorName } = body

	if (!file) return

	const id = `giffy-${crypto.randomUUID()}`

	const response = await db.gif.create({
		data: {
			id,
			title,
			images: { gif: `/apps/api/uploads/${id}.gif` },
			description,
			tags: JSON.parse(tags),
			authorName: authorName,
			authorId: authorId,
			alt,
		},
	})

	fs.rename(`./uploads/${file.originalname}`, `./uploads/${id}.gif`)
		.then(() => {})
		.catch((err) => {
			console.error('Error renaming file', err)
		})

	if (response) {
		return res.status(202).json({ message: 'Gif created' })
	}
	return res.status(500).json({ message: 'Error creating gif' })
}
