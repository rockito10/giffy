// ---------------------------------------------------------
// Response from Giphy API
// ---------------------------------------------------------

export interface ListOfGifs {
	gifs: Gif[]
	page: number
	pos: string
}

export type ImageFormat = 'gif' | 'mp4' | 'tinygif' | 'webp'

export interface Gif {
	alt: string
	id: string
	images: Record<ImageFormat, string>
	tags: string[]
	title: string
	authorData: AuthorData
	description: string
}

export interface AuthorData {
	authorName: string
	authorId: string
	authorAvatar: string
}

// Response from Giphy API

export interface UploadResponseJSON {
	message: string
	id: string
}

// ---------------------------------------------------------
// Response from Tenor API
// ---------------------------------------------------------

export interface ListOfGifsResponse {
	results: GifResponse[]
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

export interface TrendingGifResponse {
	locale: string
	results: GifResponse[]
	next: string
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

export interface LoginInfo {
	id: string
	username: string
	avatar: string
}

// ---------------------------------------------------------
// Comments
// ---------------------------------------------------------

export interface Comment {
	avatar: string
	comment_id: number
	text: string
	gif_id: string
	user_name: string
	user_id: string
}

export interface CommentResponse {
	mappedComments: Comment[]
	nextCommentId: number
}
