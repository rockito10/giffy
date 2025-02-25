import type { Request, Response } from 'express'
import { TENOR_API } from '../config/env'
import { gifResponseMapper } from '../utils/gifResponseMapper'

export async function getTrendingController(req: Request, res: Response) {
	const pos = req.headers['x-postenor']
	// const page_n = Number(page)

	let URL = `${TENOR_API.API_BASE_URL}/featured?&key=${TENOR_API.API_KEY}&limit=${40}`
	if (pos) {
		URL += `&pos=${pos}`
	}

	const resp = await fetch(URL)
	const data = await resp.json()

	const mappedGifs = gifResponseMapper(data)

	return res.status(200).json({
		gifs: mappedGifs.gifs,
		page: '1',
		pos: mappedGifs.pos,
	})
}
