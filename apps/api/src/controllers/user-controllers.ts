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
