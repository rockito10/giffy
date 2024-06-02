import { useEffect, useState } from "react"

import type { MappedGifs } from "../types/types"

import { getSearch } from "../services/getSearch"

export function useGifs() {
  const [data, setData] = useState<MappedGifs>({
    data: [],
    next: "",
  })

  const [query, setQuery] = useState("") // default
  const [next, setNext] = useState("")

  const nextPage = () => {
    setNext(data.next)
  }

  async function fetchData() {
    if (!query) return

    const gifs = await getSearch({ next, query })

    setData((previousGifs) => {
      if (!gifs) return previousGifs

      // combinar las response anteriores con las nuevas
      return {
        data: [...gifs.data, ...previousGifs.data],
        next: gifs.next,
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [query, next])

  // [] -> solo se ejecuta cuando se monta el componente
  // [gifParams] -> se ejecuta cuando se monta el componente y cuando gifParams cambie
  // return () => {} -> se ejecuta cuando se desmonta el componente

  return { data, nextPage, query, setQuery }
}
