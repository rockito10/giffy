import { OptimisticCommentsContextProvider } from "../../contexts/OptimisticCommentsContext"
import { useFetch } from "../../hooks/useFetch"
import { getComments } from "../../services/getComments"
import { Comments } from "./Comments"
import { NewComment } from "./NewComment"

interface Props {
  gifId: string | undefined
}

export function CommentSection({ gifId }: Props) {
  // Get Comments (GiffyDb)
  const { data } = useFetch({
    service: () => getComments({ gifId }),
  })
  // isLoading isError perhaps

  return (
    <OptimisticCommentsContextProvider>
      <section className="space-y-6">
        <NewComment isFirstComment={!data?.length} />
        <Comments data={data} />
      </section>
    </OptimisticCommentsContextProvider>
  )
}
