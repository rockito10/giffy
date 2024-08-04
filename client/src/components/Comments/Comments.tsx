import { useOptimisticCommentsContext } from "../../hooks/useOptimisticCommentsContext"
import type { CommentsResponse } from "../../types/comments"
import { Comment } from "./Comment"

interface CommentsProps {
  data: CommentsResponse | null
}

export function Comments({ data }: CommentsProps) {
  const { comments: optComments } = useOptimisticCommentsContext()

  // const

  return (
    <div>
      <ul className="space-y-4">
        {/* Optimistic comments */}

        {optComments?.map(({ comment_num, username, avatar, comment }) => (
          <Comment
            key={comment_num}
            avatar={
              "https://wiki.teamfortress.com/w/images/thumb/7/7b/Soldier.png/250px-Soldier.png"
            }
            comment={comment}
            username={username}
          />
        ))}

        {/* Database comments */}
        {data?.map(({ comment_num, username, avatar, comment }) => (
          <Comment key={comment_num} avatar={avatar} comment={comment} username={username} />
        ))}
      </ul>
    </div>
  )
}
