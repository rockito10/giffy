import { db } from '@/config/db'
import { TENOR_API } from '@/config/env'
import { dataMapper, gifResponseMapper } from '@/utils/gifResponseMapper'
import { BAD_REQUEST } from '@/utils/status'
import type { ListOfGifsResponse } from '@giffy/types'
import type { NextFunction, Request, Response } from 'express'

// Por Query

export async function getSearchController(req: Request, res: Response, next: NextFunction) {
	const { query } = req.params
	const { page } = req.query
	const pos = req.headers['x-postenor']
	const page_n = Number(page)

	const isOneWord = !query.includes(' ')

	const dbResponse = await db.gif.findMany({
		where: {
			title: {
				equals: isOneWord ? query : query.split(' ')[0],
				mode: 'insensitive',
			},
		},
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

	const URL = `${TENOR_API.API_BASE_URL}/search?q=${query}&key=${
		TENOR_API.API_KEY
	}&limit=${40}&pos=${pos}`

	const resp = await fetch(URL)

	if (resp.status === 404) {
		return next(BAD_REQUEST('Error fetching Gifs'))
	}

	const data = await resp.json()
	const mappedGifs = gifResponseMapper(data)

	return res.status(200).json({
		gifs: [...dbResponse, ...mappedGifs.gifs],
		page: `${page_n}`,
		pos: mappedGifs.pos,
	})
}

// Por ID

export async function getGifByIdController(req: Request, res: Response, next: NextFunction) {
	const id = req.params.gifId

	// Buscar en la base de datos

	const responseByDB = await db.gif.findUnique({ where: { id } })

	if (responseByDB) {
		return res.status(200).json(responseByDB)
	}

	// Buscar en la API

	const URL = `${TENOR_API.API_BASE_URL}/posts?key=${TENOR_API.API_KEY}&ids=${id}`

	const responseByTenorAPI = await fetch(URL)

	if (responseByTenorAPI.status === 404) {
		return next()
	}

	const data: ListOfGifsResponse | null = await responseByTenorAPI.json()

	if (!data) {
		return res.status(200).json({ message: 'Gif not found' })
	}

	const rawGif = data?.results

	if (!rawGif) return res.status(404).json({})

	const mappedGif = dataMapper(rawGif[0])

	return res.status(200).json(mappedGif)
}
