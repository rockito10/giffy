import { db } from '@/config/db'
import type { Request, Response } from 'express'

export async function getLikes(req: Request, res: Response) {
	const { gifId } = req.params

	const { userID } = req.query
	// const { userID } = req.body
	// console.log(req.body, gifId)
	const likes = await db.gif_interactions.findUnique({
		where: {
			gif_id: gifId,
		},
		select: {
			gif_likes: true,
		},
	})
	const isLiked = await db.liked.findUnique({
		where: {
			user_id_gif_id: {
				user_id: userID as string,
				gif_id: gifId,
			},
		},
	})
	res.json({ likesNumber: likes?.gif_likes, isLiked: !!isLiked })
}

export async function postLikes(req: Request, res: Response) {
	const { gifId } = req.params
	const userId: string = req.body.userId

	if (!userId) {
		// Manejar el caso en el que `userId` no esté presente
		return res.status(400).json({ error: 'User ID is required' })
	}

	const isLiked = await db.liked.findUnique({
		where: {
			user_id_gif_id: {
				user_id: userId,
				gif_id: gifId,
			},
		},
	})

	if (isLiked) {
		await upsertDecrement(gifId)

		await db.liked.delete({
			where: {
				user_id_gif_id: {
					gif_id: gifId,
					user_id: userId,
				},
			},
		})
	} else {
		await upsertIncrement(gifId)

		await db.liked.create({
			data: {
				gif_id: gifId,
				user_id: userId,
			},
		})
	}

	return res.status(202).json({ message: 'Like received' })
}
async function upsertIncrement(gifId: string) {
	await db.gif_interactions.upsert({
		where: {
			gif_id: gifId,
		},
		create: {
			gif_id: gifId,
			gif_likes: 1,
		},
		update: {
			gif_likes: {
				increment: 1,
			},
		},
	})
}

async function upsertDecrement(gifId: string) {
	await db.gif_interactions.upsert({
		where: {
			gif_id: gifId,
		},
		create: {
			gif_id: gifId,
			gif_likes: 1,
		},
		update: {
			gif_likes: {
				decrement: 1,
			},
		},
	})
}
