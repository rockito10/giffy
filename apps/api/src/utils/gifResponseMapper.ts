import type {
	Gif,
	GifResponse,
	ListOfGifs,
	ListOfGifsResponse,
	TrendingGifResponse,
} from '@giffy/types'
import type { JsonValue } from '@prisma/client/runtime/library'

export function gifResponseMapper(response: ListOfGifsResponse | TrendingGifResponse): ListOfGifs {
	return {
		gifs: response.results.map((gif) => dataMapper(gif)),
		pos: response.next,
		page: 1,
	}
}

export function tenorResponseMapper(response: GifResponse[]): ListOfGifs {
	return {
		gifs: response.map((gif) => dataMapper(gif)),
		page: 1,
		pos: '',
	}
}

// GIF

type GifAndUserFromDb = {
	user: {
		user_id: string
		user_name: string
		avatar: string | null
	}
} & {
	alt: string
	id: string
	images: JsonValue
	tags: string[]
	title: string
	description: string
	authorName: string
	authorId: string
}

export function mapDbGif(responseByDB: GifAndUserFromDb) {
	return {
		alt: responseByDB.alt,
		id: responseByDB.id,
		images: responseByDB.images,
		tags: responseByDB.tags,
		title: responseByDB.title,
		authorData: {
			authorName: responseByDB.user.user_name,
			authorId: responseByDB.user.user_id,
			authorAvatar: responseByDB.user.avatar,
		},
		description: responseByDB.description,
	}
}

export function dataMapper(data: GifResponse): Gif {
	return {
		alt: data.content_description,
		id: data.id,
		images: {
			gif: data.media_formats.gif?.url,
			mp4: data.media_formats.mp4?.url,
			tinygif: data.media_formats.tinygif?.url,
			webp: data.media_formats.webp?.url,
		},
		tags: data.tags,
		title: data.title,

		authorData: { authorId: '', authorName: '', authorAvatar: '' },
		description: '',
	}
}
