import { TENOR_API } from "../config/env"

import { gifResponseMapper } from "../utils/gifResponseMapper"

interface GetSearchParams {
  next: string
  query: string
}

export async function getGifsByQuery({ next, query }: GetSearchParams) {
  const URL = `${TENOR_API.API_BASE_URL}/search?q=${query}&key=${TENOR_API.API_KEY}&limit=${20}&pos=${next}`

  try {
    const resp = await fetch(URL)
    const data = await resp.json()

    if (resp.status !== 200) {
      throw new Error("Error fetching gifs")
    }

    return gifResponseMapper(data)
  } catch (error) {
    return Promise.reject(error)
  }
}
