export interface Comment {
  avatar: string
  comment_id: number
  text: string
  gif_id: string | undefined
  user_name: string
  user_id: string
}

type CommentsResponse = Comment[]
