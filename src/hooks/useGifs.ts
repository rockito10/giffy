import { useEffect, useState } from "react"

import type { MappedGifs } from "../types/types"

import { getSearch } from "../services/getSearch"

export function useGifs() {
  const [data, setData] = useState<MappedGifs>({
    data: [],
    next: "",
  })

  const [query, setQuery] = useState("dragon ball") // default

  async function fetchData() {
    const gifs = await getSearch({ query })
    console.log("gifs", gifs)

    setData((previousGifs) => {
      if (!gifs) return previousGifs

      // combinar las response anteriores con las nuevas
      return {
        data: [...previousGifs.data, ...gifs.data],
        next: gifs.next,
      }
    })
  }

  useEffect(() => {
    fetchData()
    // return () => {} // cleanup
  }, [query])
  // [] -> solo se ejecuta cuando se monta el componente
  // [gifParams] -> se ejecuta cuando se monta el componente y cuando gifParams cambie
  // return () => {} -> se ejecuta cuando se desmonta el componente

  return { data, setQuery }
}
