import type { MappedGif } from "../types/types"

interface GetGifDetails {
  id: string | undefined
}

export async function getGifDetails({ id }: GetGifDetails): Promise<MappedGif> {
  const URL = `http://localhost:3000/gif/${id}`

  const resp = await fetch(URL)
  const data = await resp.json()

  return data
}
