import type { MappedGifs } from "../types/types"

interface GetGifs {
  query: string
  next: string
  signal: AbortSignal
}

export async function getSearch({ query, next, signal }: GetGifs): Promise<MappedGifs> {
  const URL = `http://localhost:3000/search/${query}/${next}`

  console.log({ URL })

  try {
    const resp = await fetch(URL, { signal })
  const data = await resp.json()

  return data
  } catch (error) {
    // if (signal.aborted) return

    if (error.name === 'AbortError') {
      return
    }

    console.log(error)    
  }
}
