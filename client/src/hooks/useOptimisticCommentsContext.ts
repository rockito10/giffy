import { useContext } from "react"
import { OptimisticCommentsContext } from "../contexts/OptimisticCommentsContext"

export function useOptimisticCommentsContext() {
  const { comments, addComment, removeComment, commentCount, setCommentCount } = useContext(OptimisticCommentsContext)
  return { comments, addComment, removeComment, commentCount, setCommentCount }
}
