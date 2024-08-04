export interface Comment {
  avatar: string
  comment_num: number
  comment: string
  gif_id: string | undefined
  username: string
}

type CommentsResponse = Comment[]
