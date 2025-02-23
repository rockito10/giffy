import type {
	Gif,
	GifResponse,
	ListOfGifs,
	ListOfGifsResponse,
	TrendingGifResponse,
} from '@giffy/types'

export function gifResponseMapper(response: ListOfGifsResponse | TrendingGifResponse): ListOfGifs {
	return {
		gifs: response.results.map((gif) => dataMapper(gif)),
		pos: response.next,
		page: 1,
	}
}


// GIF

export function dataMapper(data: GifResponse): Gif {
	return {
		alt: data.content_description,
		// original: data.media_formats.gif.url,
		id: data.id,
		images: {
			gif: data.media_formats.gif?.url,
			mp4: data.media_formats.mp4?.url,
			tinygif: data.media_formats.tinygif?.url,
			webp: data.media_formats.webp?.url,
		},
		tags: data.tags,
		title: data.title,
		authorId: '',
		authorName: '',
		description: '',
	}
}
