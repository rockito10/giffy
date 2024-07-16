import { MappedGif } from "../types/types"
import { dataMapper } from "../utils/gifResponseMapper"

type GetGifDetails = {
  id: string | undefined
}

export async function getGifDetails({ id }: GetGifDetails): Promise<MappedGif> {
  const { VITE_TENOR_API_KEY: TENOR_API_KEY } = import.meta.env
  const URL = `https://tenor.googleapis.com/v2/posts?key=${TENOR_API_KEY}&ids=${id}`

  const resp = await fetch(URL)
  const data = await resp.json()

  return dataMapper(data.results[0])
}
