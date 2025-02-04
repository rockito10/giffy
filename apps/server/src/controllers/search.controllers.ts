import { db } from '@/config/db'
import { TENOR_API } from '@/config/env'
import { dataMapper, gifResponseMapper } from '@/utils/gifResponseMapper'
import { BAD_REQUEST } from '@/utils/status'
import type { ListOfGifsResponse } from '@giffy/types'
import type { NextFunction, Request, Response } from 'express'

// Por Query

export async function getSearchController(req: Request, res: Response, next: NextFunction) {
	const { query } = req.params
	const { pos } = req.query

	const URL = `${TENOR_API.API_BASE_URL}/search?q=${query}&key=${
		TENOR_API.API_KEY
	}&limit=${20}&pos=${pos}`

	const resp = await fetch(URL)

	if (resp.status === 404) {
		return next(BAD_REQUEST('Error fetching Gifs'))
	}

	const data = await resp.json()
	const mappedGifs = gifResponseMapper(data)

	return res.status(200).json(mappedGifs)
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

	const mappedGif = dataMapper(data?.results[0])

	return res.status(200).json(mappedGif)
}
