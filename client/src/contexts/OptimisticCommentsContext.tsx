import { createContext, useState } from "react"
import type { Comment } from "../types/comments"

// ---------- Context ----------

interface OptimisticCommentsContextType {
  comments: Comment[]
  addComment: (data: Comment) => void
  removeComment: (data: Comment) => void
}

export const OptimisticCommentsContext = createContext<OptimisticCommentsContextType>({
  comments: [],
  addComment: () => {},
  removeComment: () => {},
})

// ---------- Provider ----------

interface Props {
  children: React.ReactNode
}

export function OptimisticCommentsContextProvider({ children }: Props) {
  const [comments, setComment] = useState<Comment[] | []>([])

  const addComment = (data: Comment) => {
    setComment((prev) => {
      return [...prev, data]
    })
  }

  const removeComment = (data: Comment) => {}

  return (
    <OptimisticCommentsContext.Provider
      value={{
        comments,
        addComment,
        removeComment,
      }}
    >
      {children}
    </OptimisticCommentsContext.Provider>
  )
}
