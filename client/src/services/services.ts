import type { MappedGifs } from "../types/types"

// --------------------------------------------------

export async function getGifById(id: string) {
  return (await fetch(`/api/search/gif/${id}`)).json()
}

// --------------------------------------------------

interface Params {
  query: string | undefined
  next: string | undefined | unknown
}

export async function getGifs({ query, next }: Params): Promise<MappedGifs> {
  const resp = await fetch(`/api/search/${query}/${next}`)
  const data: MappedGifs = await resp.json()
  return data
}

// --------------------------------------------------

export async function getUser(id: number) {
  const resp = await fetch(`/api/user/${id}`)
  return resp.json()
}

// --------------------------------------------------

export const fetchComments = (id: string) => fetch(`/api/comments/${id}`).then((res) => res.json())

// --------------------------------------------------
