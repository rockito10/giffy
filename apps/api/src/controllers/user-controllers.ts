import type { Request, Response } from 'express'
import { db } from '../config/db'

export async function getUserController(req: Request, res: Response) {
	const { userID } = req.params

	const user = await db.user.findUnique({
		where: { user_id: userID },
	})

	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}

	// No debería devolver la contraseña en la respuesta de la API por seguridad
	const { user_id, user_name, avatar } = user
	return res.status(200).json({ user_id, user_name, avatar })
}

export async function getUserGifsController(req: Request, res: Response) {
	const { userID } = req.params

	const { page } = req.query
	const page_n = Number(page)

	if (!page_n) return res.status(400).json({ error: 'Page number is required' })

	const userGifs = await db.gif.findMany({
		where: {
			user: {
				user_id: userID,
			},
		},
		skip: 20 * (page_n - 1),
		take: 20 * page_n,
	})

	if (!userGifs) {
		return res.status(404).json({ message: 'User not found' })
	}

	// Responder con los GIFs encontrados
	return res
		.json({
			gifs: userGifs,
			pos: '',
			page: page_n + 1,
		})
		.status(200)
}
