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

	db.gif.create({
		data: {
			comment: {},
			gif_id: 'giffy-00001',
			gif_likes: 0,
			liked: {},
		},
	})
}
