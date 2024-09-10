import { db } from '@/config/db'
import { NOT_FOUND } from '@/utils/status'
import type { NextFunction, Request, Response } from 'express'

export async function getUserController(req: Request, res: Response, next: NextFunction) {
	const { userId } = req.params

	const userInfo = await db.user.findUnique({
		where: {
			user_id: userId,
		},
	})

	if (userInfo === null) {
		return next(NOT_FOUND('User not found'))
	}

	const { user_id, user_name, avatar } = userInfo
	return res.status(200).json({ user_id, user_name, avatar })
}
