import { useEffect } from "react"
import { useOptimisticCommentsContext } from "../../hooks/useOptimisticCommentsContext"
import type { CommentsResponse } from "../../types/comments"
import { Comment } from "./Comment"

interface CommentsProps {
  data: CommentsResponse | null
}

export function Comments({ data }: CommentsProps) {
  const { comments: optComments, setCommentCount } = useOptimisticCommentsContext()

  useEffect(() => {
    setCommentCount(data!.length + 1)
  }, [])

  return (
    <div>
      <ul className="space-y-8">
        {/* Optimistic comments */}

        {optComments?.map(({ comment_id, avatar, user_name, text, user_id }) => (
          <Comment
            key={comment_id}
            avatar={avatar}
            comment={text}
            commentId={comment_id}
            userId={user_id}
            username={user_name}
          />
        ))}

        {/* Database comments */}

        {data?.map(({ comment_id, user_name, avatar, text, user_id }) => (
          <div key={comment_id}>
            <Comment
              avatar={avatar}
              comment={text}
              commentId={comment_id}
              userId={user_id}
              username={user_name}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}
