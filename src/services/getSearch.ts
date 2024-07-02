import type { MappedGifs } from "../types/types"

import { gifResponseMapper } from "../utils/gifResponseMapper"

interface GetSearchParams {
  next: string
  query: string
  signal: AbortSignal
}

const TENOR_API_KEY = "AIzaSyBwtgEHAWlCQW0bDiIrT9oksqKfElzh5r0"

export async function getSearch({
  next,
  query,
  signal,
}: GetSearchParams): Promise<MappedGifs | undefined> {
  if (!query) {
    return
  }

  const URL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&limit=${50}&pos=${next}`

  try {
    
    const resp = await fetch(URL, { signal })
    const data = await resp.json()

    console.log(data)

    if (resp.status !== 200) {
      console.log(resp.status)
      throw new Error("Error fetching gifs")
    }
    
    return gifResponseMapper(data)
  } catch (err) {
    console.error(err)
  }
}
