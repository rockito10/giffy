import { createContext, useState } from "react"
import type { Comment } from "../types/comments"

// ---------- Context ----------

interface OptimisticCommentsContextType {
  comments: Comment[]
  addComment: (data: Comment) => void
}

export const OptimisticCommentsContext = createContext<OptimisticCommentsContextType>({
  comments: [],
  addComment: () => {},
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

  return (
    <OptimisticCommentsContext.Provider
      value={{
        comments,
        addComment,
      }}
    >
      {children}
    </OptimisticCommentsContext.Provider>
  )
}
