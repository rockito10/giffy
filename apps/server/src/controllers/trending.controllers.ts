import { TENOR_API } from '@/config/env'
import { gifResponseMapper } from '@/utils/gifResponseMapper'
import type { NextFunction, Request, Response } from 'express'

export async function getTrendingController(req: Request, res: Response, next: NextFunction) {
	// const { page } = req.query
	// const pos = req.headers['x-postenor']

	console.log('pepe')

	const page = 0
	const pos = ''

	const URL = `${TENOR_API.API_BASE_URL}/featured?&key=${TENOR_API.API_KEY}&limit=${40}&pos=${pos}`

	const resp = await fetch(URL)

	// if (resp.status === 404) {
	// 	return next(BAD_REQUEST('Error fetching Gifs'))
	// }

	const data = await resp.json()
	console.log(data)
	const mappedGifs = gifResponseMapper(data)

	return res.status(200).json({
		gifs: mappedGifs.gifs,
		page: page,
		pos: mappedGifs.pos,
	})
}
