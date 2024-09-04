import { useQuery } from "@tanstack/react-query"
import { OptimisticCommentsContextProvider } from "../../contexts/OptimisticCommentsContext"
import { Comments } from "./Comments"
import { NewComment } from "./NewComment"
import type { CommentsResponse } from "../../types/comments"
import { fetchComments } from "../../services/services"

interface Props {
  gifId: string | undefined
}

export function CommentSection({ gifId }: Props) {
  const { data } = useQuery<CommentsResponse>({
    queryKey: [gifId, "comments"],
    queryFn: () => fetchComments(gifId as string),
  })

  console.log(data)

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
