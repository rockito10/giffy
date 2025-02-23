import fs from 'node:fs/promises'
import { db } from '../config/db'
import type { NextFunction, Request, Response } from 'express'

// interface Gif {
// 	gif: string
// 	title: string
// 	description: string
// 	tags: string[]
// }

export async function uploadGifController(req: Request, res: Response, next: NextFunction) {
	// export const uploadGifController = async (req: Request, res: Response, next: NextFunction) => {
	const { file, body } = req
	const { title, description, tags, author, alt } = body

	if (!file) return

	const id = `giffy-${crypto.randomUUID()}`

	const response = await db.gif.create({
		data: {
			id,
			title,
			images: { gif: `/apps/server/uploads/${id}.gif` },
			description,
			tags: JSON.parse(tags),
			author,
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
