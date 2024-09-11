// ---------------------------------------------------------
// Response from Giphy API
// ---------------------------------------------------------

export interface ListOfGifs {
	gifs: Gif[]
	next: string
}

type Key = 'gif' | 'mp4' | 'tinygif' | 'webp'

interface Gif {
	alt: string
	id: string
	images: Record<Key, string>
	tags: string[]
	title: string
}

// ---------------------------------------------------------
// Response from Tenor API
// ---------------------------------------------------------

export interface ListOfGifsResponse {
	results: Result[]
	next: string
}

export interface GifResponse {
	id: string
	title: string
	media_formats: { [key: string]: MediaFormat }
	created: number
	content_description: string
	itemurl: string
	url: string
	tags: string[]
	flags: string[] // any[]
	hasaudio: boolean
	content_description_source: ContentDescriptionSource
}

export enum ContentDescriptionSource {
	GenerativeAI = 'GENERATIVE_AI',
}

export interface MediaFormat {
	url: string
	duration: number
	preview: string
	dims: number[]
	size: number
}
