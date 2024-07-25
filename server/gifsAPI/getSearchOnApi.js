// import type { MappedGifs } from "../types/types"

import { gifResponseMapper } from "../utils/gifResponseMapper.js"

// interface GetSearchParams {
//   next: string
//   query: string
//   signal: AbortSignal
// }

// const { TENOR_API_KEY: TENOR_API_KEY } = import.meta.env

// console.log(TENOR_API_KEY)

export async function getSearchOnApi(
  { next, query, signal },
  // : GetSearchParams
) {
  // : Promise<MappedGifs | undefined>
  if (!query) {
    return
  }

  const URL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${"AIzaSyBwtgEHAWlCQW0bDiIrT9oksqKfElzh5r0"}&limit=${20}&pos=${next}`

  try {
    const resp = await fetch(URL)
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
