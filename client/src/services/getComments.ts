import type { CommentsResponse } from "../types/comments"

interface GetCommentsProps {
  gifId: string | undefined
}

export async function getComments({ gifId }: GetCommentsProps): Promise<CommentsResponse> {
  const resp = await fetch(`/api/comments/${gifId}`)
  const data = await resp.json()
  return data
}
