import { useQuery } from "@tanstack/react-query"
import { OptimisticCommentsContextProvider } from "../../contexts/OptimisticCommentsContext"
import { Comments } from "./Comments"
import { NewComment } from "./NewComment"
import type { CommentsResponse } from "../../types/comments"
import { fetchComments } from "../../services/services"
import { useParams } from "wouter"

export function CommentSection() {
  const { id: gifId } = useParams()

  const { data } = useQuery<CommentsResponse>({
    queryKey: ["comments", gifId],
    queryFn: () => fetchComments(gifId as string),
  })

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
