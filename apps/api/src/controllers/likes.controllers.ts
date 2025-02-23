import { db } from '../config/db'
import { TENOR_API } from '../config/env'
import { tenorResponseMapper } from '../utils/gifResponseMapper'
import type { GifResponse, ListOfGifs, ListOfGifsResponse } from '@giffy/types'
import type { Request, Response } from 'express'

export async function getLikes(req: Request, res: Response) {
	const { gifId } = req.params

	const { userID } = req.query

	if (!userID || userID === '') {
		// Manejar el caso en el que `userId` no esté presente
		return res.status(400).json({ error: 'User ID is required' })
	}

	try {
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
	} catch (error) {
		console.error(error)
		res.status(404).json({ error: 'Data not found' })
	}
}

export async function postLikes(req: Request, res: Response) {
	const { gifId } = req.params
	const userID: string = req.body.userID

	if (!userID || userID === '') {
		// Manejar el caso en el que `userId` no esté presente
		return res.status(400).json({ error: 'User ID is required' })
	}

	try {
		const isLiked = await db.liked.findUnique({
			where: {
				user_id_gif_id: {
					user_id: userID,
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
						user_id: userID,
					},
				},
			})
		} else {
			await upsertIncrement(gifId)

			await db.liked.create({
				data: {
					gif_id: gifId,
					user_id: userID,
				},
			})
		}
		return res.status(202).json({ message: 'Like received' })
	} catch (error) {
		console.error(error)
		return res.status(404).json({ error: 'Data not found' })
	}
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

export async function getLikedGifs(req: Request, res: Response) {
	const { userID } = req.params
	const { page } = req.query
	const page_n = Number(page)

	if (!page_n) return res.status(400).json({ error: 'Page number is required' })

	// Obtener los GIFs liked por el usuario con `user_id` igual a `userID`
	const gifsIDs = await db.liked.findMany({
		where: {
			user_id: userID, // Filtramos por el userID
		},
		select: {
			gif_id: true,
		},
		skip: 20 * (page_n - 1),
		take: 20 * page_n,
	})

	// // Extraer solo los GIFs (sin la información de la relación `liked`)
	// const mappedGiffyIds = gifsIDs.filter((gif) => gif.gif_id.startsWith('giffy'))
	// const mappedTenorIds = gifsIDs.filter((gif) => !gif.gif_id.startsWith('giffy'))

	const mappedGiffyIds = []
	const mappedTenorIds = []

	for (const gif of gifsIDs) {
		if (gif.gif_id.startsWith('giffy')) {
			mappedGiffyIds.push(gif.gif_id)
		} else {
			mappedTenorIds.push(gif.gif_id)
		}
	}

	// const gifs: ListOfGifs | [] = []

	// GIFS FROM DATABASE
	const giffyGifs = await db.gif.findMany({
		where: {
			id: { in: mappedGiffyIds },
		},
	})

	// GIFS FROM TENOR

	const tenorGifs = await getTenorGifs(mappedTenorIds)

	// Responder con los GIFs encontrados
	return res
		.json({
			gifs: [...giffyGifs, ...tenorGifs.gifs],
			pos: '',
			page: page_n + 1,
		})
		.status(200)
}

async function getTenorGifs(tenorIDs: string[]): Promise<ListOfGifs> {
	// Obtener los GIFs utilizando Promise.allSettled y filtrar solo los resultados 'fulfilled'
	const promises = await Promise.allSettled(tenorIDs.map(getTenorGif))

	const mappedPromises = (
		promises.filter(
			(response) => response.status === 'fulfilled' && response.value !== undefined,
		) as PromiseFulfilledResult<GifResponse[]>[]
	) // Filtramos solo los resultados 'fulfilled', como son sí o sí fulfilled, no pueden ser undefined ni rejected
		.flatMap((response) => response.value)

	// Pasamos los resultados a dataMapper y retornamos
	return tenorResponseMapper(mappedPromises)
}

async function getTenorGif(tenorID: string) {
	const URL = `${TENOR_API.API_BASE_URL}/posts?key=${TENOR_API.API_KEY}&ids=${tenorID}`

	const response = await fetch(URL)

	const data: ListOfGifsResponse | null = await response.json()

	const rawGif = data?.results

	return rawGif
}
