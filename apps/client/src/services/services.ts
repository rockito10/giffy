import type { UserInfo } from '@/types/types'
import type { ListOfGifs } from '@giffy/types'

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

interface GetFavoritesAndUploadedParams {
	page: number
	userID: string
}

export async function getUploadedGifs({ page, userID }: GetFavoritesAndUploadedParams) {
	const resp = await fetch(`/api/user/${userID}/gifs?page=${page}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data: ListOfGifs = await resp.json()
	return data
}

export async function getFavoriteGifs({ page, userID }: GetFavoritesAndUploadedParams) {
	const resp = await fetch(`/api/likes/user/${userID}?page=${page}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data: ListOfGifs = await resp.json()
	return data
}

interface GetTrendingParams {
	pos: string
	page: number
}

export async function getTrendingListOfGifs({ pos }: GetTrendingParams) {
	const resp = await fetch('/api/trending', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-PosTenor': pos, // Enviar `pos` en el header
		},
	})
	const data: ListOfGifs = await resp.json()
	return data
}

interface GetQueryParams {
	pos: string
	page: number
	query?: string
}

export async function getQueryListOfGifs({ query, pos, page }: GetQueryParams) {
	const resp = await fetch(`/api/search/${query}?page=${page}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-PosTenor': pos, // Enviar `pos` en el header
		},
	})
	const data: ListOfGifs = await resp.json()
	return data
}

// export const getListOfGifs = async ({ query, pos }: Params) => {
// 	const URL = `/api/search/${query}?pos=${pos}`
// 	const res = await fetch(URL)
// 	return await res.json()
// }

// --------------------------------------------------

export async function getUser(id: string | null): Promise<UserInfo> {
	if (!id) return { avatar: '', user_name: 'Guest', user_id: '0' }
	const resp = await fetch(`/api/user/${id}`)
	return resp.json()
}

// --------------------------------------------------

// GET
export const fetchComments = (id: string) => fetch(`/api/comments/${id}`).then((res) => res.json())

// POST

export interface PostCommentParams {
	commentText: string
	userId: string
	gifId: string
}

export const postComment = async (params: PostCommentParams) => {
	const { commentText, userId, gifId } = params

	try {
		const response = await fetch(`/api/comments/${gifId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ commentText, userId }),
		})

		if (response.status === 201) {
			// Confirmamos que el comentario se ha enviado
		}

		if (response.status !== 201) {
			// Mostrar mensaje de error
		}
	} catch (error) {}
}

// DELETE

interface DeleteCommentParams {
	commentId: number
	userId: string
	gifId: string
}
export async function deleteComment({ userId, gifId, commentId }: DeleteCommentParams) {
	await fetch(`/api/comments/${gifId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ commentId, userId }),
	})
}

// --------------------------------------------------
