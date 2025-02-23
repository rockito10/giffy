import { db } from '@/config/db'
import type { LoginInfo } from '@giffy/types'
import type { Request, Response } from 'express'

export async function postLogin(req: Request, res: Response) {
	const { username, password } = req.body

	const user = await db.user.findUnique({
		where: {
			user_name: username,
		},
	})
	// Invalid credentials
	if (!user || user.password !== password) {
		return res.status(400).json({ message: 'Invalid credentials' })
	}

	if (!user.avatar) {
		return res.status(400).json({ message: 'Failed to login' })
	}

	const loginInfo: LoginInfo = {
		username: user.user_name,
		avatar: user.avatar,
		id: user.user_id,
	}

	res.status(200).json({
		message: 'Login successful',
		data: loginInfo,
	})
}
