import { createContext, useState } from "react"
import type { Comment } from "../types/comments"

// ---------- Context ----------

interface OptimisticCommentsContextType {
  comments: Comment[]
  addComment: (data: Comment) => void
  removeComment: (commentId: number) => void
  commentCount: number
  setCommentCount: (newCommentCount: number) => void
}

export const OptimisticCommentsContext = createContext<OptimisticCommentsContextType>({
  comments: [],
  addComment: () => {},
  removeComment: () => {},
  commentCount: 0,
  setCommentCount: () => {},
})

// ---------- Provider ----------

interface Props {
  children: React.ReactNode
}

export function OptimisticCommentsContextProvider({ children }: Props) {
  const [comments, setComment] = useState<Comment[] | []>([])

  // Peticion a la base de datos
  // const data = fetchComments()

  const data = null

  const [commentCount, setCommentCount] = useState<number>(data ?? 0)

  const addComment = (data: Comment) => {
    setComment((prev) => {
      return [...prev, data]
    })
    setCommentCount(commentCount + 1)
  }

  const removeComment = (commentId: number) => {
    const newComments = comments.filter((comment) => comment.comment_id !== commentId)
    setComment(newComments)
  }

  return (
    <OptimisticCommentsContext.Provider
      value={{
        comments,
        addComment,
        removeComment,
        commentCount,
        setCommentCount,
      }}
    >
      {children}
    </OptimisticCommentsContext.Provider>
  )
}
