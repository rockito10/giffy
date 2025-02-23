// ---------------------------------------------------------
// Response from Tenor API
// ---------------------------------------------------------

export interface Main {
	results: Result[]
	next: string
}

export interface Result {
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

export interface UserInfo {
	user_name: string
	avatar: string
	user_id: string
}

// ---------------------------------------------------------
// GIF Comments
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
