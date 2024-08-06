import { useOptimisticCommentsContext } from "../../hooks/useOptimisticCommentsContext"
import type { CommentsResponse } from "../../types/comments"
import { Comment } from "./Comment"

interface CommentsProps {
  data: CommentsResponse | null
}

export function Comments({ data }: CommentsProps) {
  const { comments: optComments } = useOptimisticCommentsContext()

  return (
    <div>
      <ul className="space-y-8">
        {/* Optimistic comments */}

        {optComments?.map(({ comment_num, avatar, username, comment }) => (
          <Comment key={comment_num} avatar={avatar} comment={comment} username={username} />
        ))}

        {/* Database comments */}
        {data?.map(({ comment_num, username, avatar, comment }) => (
          <div key={comment_num}>
            <Comment avatar={avatar} comment={comment} username={username} />
          </div>
        ))}
      </ul>
    </div>
  )
}
