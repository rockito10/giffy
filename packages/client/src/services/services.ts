// --------------------------------------------------

import { MappedGifs } from '@/types/types'

// function createURL(path: string, { pos }: { pos: string }) {
// 	const params = new URLSearchParams({ pos })
// 	const URL = '/api/' + path + '?' + params.toString()
// 	return URL
// }
// --------------------------------------------------

export async function getGifById(id: string) {
	return (await fetch(`/api/search/gif/${id}`)).json()
}

// --------------------------------------------------

interface Params {
	query: string
	pos?: string
}

export async function getListOfGifs({ query, pos }: Params): Promise<MappedGifs> {
	const resp = await fetch(`/api/search/${query}}?pos=${pos}`)
	const data: MappedGifs = await resp.json()
	console.log(data)

	return data
}

// export const getListOfGifs = async ({ query, pos }: Params) => {
// 	const URL = `/api/search/${query}?pos=${pos}`
// 	const res = await fetch(URL)
// 	return await res.json()
// }

// --------------------------------------------------

export async function getUser(id: string) {
	const resp = await fetch(`/api/user/${id}`)
	return resp.json()
}

// --------------------------------------------------

export const fetchComments = (id: string) => fetch(`/api/comments/${id}`).then((res) => res.json())

// --------------------------------------------------
