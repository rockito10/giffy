import { TENOR_API } from "../config/env"
import type { MappedGif } from "../types/types"
import { dataMapper } from "../utils/gifResponseMapper"

interface FetchGifById {
  gifId: string
}

export async function fetchGifById({ gifId }: FetchGifById): Promise<MappedGif> {
  const URL = `${TENOR_API.API_BASE_URL}/posts?key=${TENOR_API.API_KEY}&ids=${gifId}`

  try {
    const resp = await fetch(URL)
    const data = await resp.json()
    return dataMapper(data.results[0])
  } catch (error) {
    return Promise.reject(error)
  }
}
