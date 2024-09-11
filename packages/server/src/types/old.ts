export interface ListOfGifResponse {
	next: string
	results: GifResponse[]
}

export interface GifResponse {
	content_description: string
	created: number
	flags: string[]
	hasaudio: boolean
	id: string
	itemurl: string
	media_formats: Record<string, Metadata>
	tags: string[]
	title: string
	url: string
}

export interface Metadata {
	dims: number[]
	duration: number
	preview: string
	size: number
	url: string
}

// ------------------------------

interface MappedGifs {
	gifs: MappedGif[]
	next: string
}

type Key = 'gif' | 'mp4' | 'tinygif' | 'webp'

interface MappedGif {
	alt: string
	id: string
	images: Record<Key, string>
	tags: string[]
	title: string
}
