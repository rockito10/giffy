import type { MappedGifs } from "../types/types"

import { gifResponseMapper } from "../utils/gifResponseMapper"

interface GetSearchParams {
  query: string
}

const TENOR_API_KEY = "AIzaSyBwtgEHAWlCQW0bDiIrT9oksqKfElzh5r0"

export async function getSearch({ query }: GetSearchParams): Promise<MappedGifs | undefined> {
  const URL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&limit=${50}`

  try {
    const resp = await fetch(URL)
    const data = await resp.json()

    if (resp.status !== 200) {
      console.log(resp.status)
      throw new Error("Error fetching gifs")
    }

    return gifResponseMapper(data)
  } catch (err) {
    console.error(err)
  }
}
