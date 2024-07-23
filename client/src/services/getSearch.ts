import type { MappedGifs } from "../types/types"

import { gifResponseMapper } from "../utils/gifResponseMapper"

interface GetSearchParams {
  next: string
  query: string
  signal: AbortSignal
}

const { VITE_TENOR_API_KEY: TENOR_API_KEY } = import.meta.env

export async function getSearch({
  next,
  query,
  signal,
}: GetSearchParams): Promise<MappedGifs | undefined> {
  if (!query) {
    return
  }

  const URL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&limit=${20}&pos=${next}`

  try {
    const resp = await fetch(URL, { signal })
    const data = await resp.json()

    if (resp.status !== 200) {
      console.log(resp.status)
      throw new Error("Error fetching gifs")
    }

    console.log(data)

    return gifResponseMapper(data)
  } catch (error) {
    if (signal.aborted) return

    console.log(error)
  }
}
