import type { MappedGif } from "../types/types"

interface GetGifDetails {
  id: string | undefined
}

export async function getGifDetails({ id }: GetGifDetails): Promise<MappedGif> {
  const resp = await fetch(`/api/search/${id}`)
  const data = await resp.json()
  return data
}
