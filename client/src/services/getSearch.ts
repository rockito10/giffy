// import type { MappedGifs } from "../types/types"

import type { MappedGifs } from "../types/types"

// import { gifResponseMapper } from "../utils/gifResponseMapper"

// interface GetSearchParams {
//   next: string
//   query: string
//   signal: AbortSignal
// }

// // const { VITE_TENOR_API_KEY: TENOR_API_KEY } = import.meta.env

// const TENOR_API_KEY = getAPI_Key()

// console.log(TENOR_API_KEY)

// export async function getSearch({
//   next,
//   query,
//   signal,
// }: GetSearchParams): Promise<MappedGifs | undefined> {
//   if (!query) {
//     return
//   }

//   const URL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&limit=${20}&pos=${next}`

//   // const URL = `http://localhost:3000/query/q=${query}&pos=${next}`

//   try {
//     const resp = await fetch(URL, { signal })
//     const data = await resp.json()

//     if (resp.status !== 200) {
//       console.log(resp.status)
//       throw new Error("Error fetching gifs")
//     }

//     console.log(data)

//     return gifResponseMapper(data)
//   } catch (error) {
//     if (signal.aborted) return

//     console.log(error)
//   }
// }

// const { data: API_KEY } = useFetch({ service: async () => fetch(URL) })

// import { MappedGif } from "../types/types"

interface GetGifs {
  query: string
  next: string
  signal: AbortSignal
}

export async function getSearch({ query, next, signal }: GetGifs): Promise<MappedGifs> {
  const URL = `http://localhost:3000/search/${query}/${next}`

  console.log({ URL })

  const resp = await fetch(URL, { signal })
  const data = await resp.json()

  return data
}
