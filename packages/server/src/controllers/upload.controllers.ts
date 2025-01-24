import { db } from '@/config/db'
import type { NextFunction, Request, Response } from 'express'

interface Gif {
	gif: string
	title: string
	description: string
	tags: string[]
}

export async function uploadGifController(req: Request, res: Response, next: NextFunction) {
	const { gif, title, description, tags } = req.body as Gif

	console.log(gif, title, description, tags)

	try {
		db.custom_gif.create({
			data: {
				// gif_id: crypto.randomUUID(),
				title,
				url: 'https://media.tenor.com/-Y2YOay3_JoAAAAC/its-friday-dancing.gif',
				description,
				tags,
			},
		})
		return res.status(202).json({ message: 'Gif created' })
	} catch (error) {
		return res.status(500).json({ message: 'Error creating gif' })
	}
}
