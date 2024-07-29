import { TENOR_API_KEY } from "../environment/environment"
import type { MappedGif } from "../types/types.d.ts"
import { dataMapper } from "../utils/gifResponseMapper"

interface GetGifById {
  id: string
}

export async function getGifById({ id }: GetGifById): Promise<MappedGif> {
  const URL = `https://tenor.googleapis.com/v2/posts?key=${TENOR_API_KEY}&ids=${id}`

  const resp = await fetch(URL)
  const data = await resp.json()
  return dataMapper(data.results[0])
}
