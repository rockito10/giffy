// import type { MappedGif } from "../types/types"
// import { dataMapper } from "../utils/gifResponseMapper"

// interface GetGifDetails {
//   id: string | undefined
// }

// export async function getGifs({ query, limit, next }: GetGifDetails): Promise<MappedGif> {
//   const { VITE_TENOR_API_KEY: TENOR_API_KEY } = import.meta.env

//   const URL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&limit=${limit}&pos=${next}`
//   const resp = await fetch(URL)
//   const data = await resp.json()

//   return data.results[0]
// }
