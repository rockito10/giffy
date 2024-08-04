import type { MappedGifs } from "../types/types"

interface GetGifs {
  query: string
  next: string
  signal: AbortSignal
}

export async function getSearch({ query, next, signal }: GetGifs): Promise<MappedGifs> {
  console.log({ URL })

  try {
    const resp = await fetch(`/api/search/${query}/${next}`, { signal })
    const data = await resp.json()

    return data
  } catch (error) {
    // if (signal.aborted) return
    if (error.message === "AbortError") {
      return new Promise((_, reject) => reject(error))
    }

    console.log(error)
  }
}
