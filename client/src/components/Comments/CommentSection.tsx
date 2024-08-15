import { OptimisticCommentsContextProvider } from "../../contexts/OptimisticCommentsContext"
import { useFetch } from "../../hooks/useFetch"
import type { CommentsResponse } from "../../types/comments"
// import { getComments } from "../../services/getComments"
import { Comments } from "./Comments"
import { NewComment } from "./NewComment"

interface Props {
  gifId: string | undefined
}

export function CommentSection({ gifId }: Props) {
  // Get Comments (GiffyDb)
  const { data } = useFetch<CommentsResponse>(`/api/comments/${gifId}`) // crear intermedio
  // isLoading isError perhaps

  if (!data) return <div>No comments</div>

  return (
    <OptimisticCommentsContextProvider>
      <section className="space-y-6">
        <NewComment isFirstComment={!data.length} />
        <Comments data={data} />
      </section>
    </OptimisticCommentsContextProvider>
  )
}
