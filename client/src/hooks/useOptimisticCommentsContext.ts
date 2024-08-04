import { useContext } from "react"
import { OptimisticCommentsContext } from "../contexts/OptimisticCommentsContext"

export function useOptimisticCommentsContext() {
  const { comments, addComment } = useContext(OptimisticCommentsContext)
  return { comments, addComment }
}
