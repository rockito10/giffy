import { TENOR_API_KEY } from "../environment/environment"

import { gifResponseMapper } from "../utils/gifResponseMapper"

interface GetSearchParams {
  next: string
  query: string
  signal?: AbortSignal
}

export async function getGifsByQuery({ next, query, signal }: GetSearchParams) {
  const URL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&limit=${20}&pos=${next}`

  try {
    const resp = await fetch(URL)
    const data = await resp.json()

    if (resp.status !== 200) {
      console.log(resp.status)
      throw new Error("Error fetching gifs")
    }

    return gifResponseMapper(data)
  } catch (error) {
    if (signal?.aborted) return
    console.log(error)
    return { next: "", gifs: [] }
  }
}
