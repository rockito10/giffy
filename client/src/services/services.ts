import type { MappedGifs } from "../types/types"

// --------------------------------------------------

export async function getGifById(id: string) {
  return (await fetch(`/api/search/gif/${id}`)).json()
}

// --------------------------------------------------

interface Params {
  query: string
  next: string
}

export async function getGifs({ query, next }: Params): Promise<MappedGifs> {
  const resp = await fetch(`/api/search/${query}/${next}`)
  const data: MappedGifs = await resp.json()
  return data
}

// --------------------------------------------------
