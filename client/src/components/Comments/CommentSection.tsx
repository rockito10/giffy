import type { GifComments } from "../../types/types"
import { Comment } from "./Comment"
import { NewComment } from "./NewComment"

interface Props {
  comments: GifComments | null
}

export function CommentSection({ comments }: Props) {
  return (
    <div className="flex flex-col">
      <ul className="space-y-4">
        {comments?.map(({ comment_num, username, avatar, comment }) => (
          <Comment key={comment_num} avatar={avatar} comment={comment} username={username} />
        ))}
        {/* Comment Optimista */}
      </ul>

      <div>
        <NewComment isFirstComment={!comments?.length} />
      </div>
    </div>
  )
}
