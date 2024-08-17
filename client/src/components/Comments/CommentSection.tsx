import { useQuery } from "@tanstack/react-query"
import { OptimisticCommentsContextProvider } from "../../contexts/OptimisticCommentsContext"
// import { useFetch } from "../../hooks/useFetch"
// import type { CommentsResponse } from "../../types/comments"
// import { getComments } from "../../services/getComments"
import { Comments } from "./Comments"
import { NewComment } from "./NewComment"
import { useFetch } from "../../hooks/useFetch"
import { CommentsResponse } from "../../types/comments"

interface Props {
  gifId: string | undefined
}

const fetchComments = (id: string) => fetch(`/api/comments/${id}`).then((res) => res.json())

export function CommentSection({ gifId }: Props) {
  // Get Comments (GiffyDb)
  // const { data } = useFetch<CommentsResponse>(`/api/comments/${gifId}`) // crear intermedio

  const { data, status } = useQuery<CommentsResponse>({
    queryKey: [gifId, "comments"],
    queryFn: () => fetchComments(gifId as string),
  })

  // if (status === "error") return <div>Error: {error?.message}</div>

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
