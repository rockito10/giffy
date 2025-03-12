import type { Request, Response } from 'express'
import { db } from '../config/db'
import { TENOR_API } from '../config/env'
import { gifResponseMapper } from '../utils/gifResponseMapper'

export async function getTrendingController(req: Request, res: Response) {
	const { page } = req.query
	const pos = req.headers['x-postenor']
	const page_n = Number(page)

	if (!page_n) return res.status(400).json({ error: 'Missing page' })

	const dbResponse = await db.gif.findMany({
		orderBy: { title: 'asc' },
		skip: 20 * (page_n - 1), // Skip the first 20 results
		take: 20 * page_n, // Take the next 20 results (items 21-40)
	})

	if (dbResponse.length >= 20)
		//skip in case of having 20 gifs in db
		return res.status(200).json({
			gifs: dbResponse,
			next: `${page_n + 1}`,
			pos: pos,
		})

	let URL = `${TENOR_API.API_BASE_URL}/featured?&key=${TENOR_API.API_KEY}&limit=${40}`
	if (pos) {
		URL += `&pos=${pos}`
	}

	const resp = await fetch(URL)
	const data = await resp.json()

	const mappedGifs = gifResponseMapper(data)

	return res.status(200).json({
		gifs: [...dbResponse, ...mappedGifs.gifs],
		page: `${page_n + 1}`,
		pos: mappedGifs.pos,
	})
}
