import { useEffect, useState } from "react"

import type { MappedGifs } from "../types/types"

import { getSearch } from "../services/getSearch"
import { $searchStore } from "../store/search"

export function useGifs() {
  const [data, setData] = useState<MappedGifs>({
    data: [],
    next: "",
  })

  const [query, setQuery] = useState("") // default
  const [next, setNext] = useState("")

  const abortController = new AbortController()

  const nextPage = () => {
    setNext(data.next)
  }

  // Fetch query gifs

  // ---------------------------------------------

  async function fetchDataQuery() {
    if (!query) return

    const gifs = await getSearch({ next: "", query, signal: abortController.signal })

    if (!gifs) return

    setData({ data: gifs.data, next: gifs.next })

    // guardamos datos en nanostore para persistirlos (incluso fuera de la página inicial)
    $searchStore.set({
      $searchData: {
        data: gifs.data,
        next: gifs.next,
      },
      $searchQuery: query,
    })
  }

  useEffect(() => {
    setTimeout(fetchDataQuery, 300)

    return () => {
      abortController.abort()
    }
  }, [query])

  // Fetch next gifs
  // ---------------------------------------------

  async function fetchDataNext() {
    const gifs = await getSearch({ next, query, signal: abortController.signal })

    setData((previousGifs) => {
      if (!gifs) return previousGifs

      // combinar las response anteriores con las nuevas
      console.log([...previousGifs.data, ...gifs.data])

      return {
        data: [...previousGifs.data, ...gifs.data],
        next: gifs.next,
      }
    })

    // $searchStore.set({ data: gifs.data, next: gifs.next })
  }

  useEffect(() => {
    fetchDataNext()
  }, [next])

  // ---------------------------------------------

  // [] -> solo se ejecuta cuando se monta el componente
  // [gifParams] -> se ejecuta cuando se monta el componente y cuando gifParams cambie
  // return () => {} -> se ejecuta cuando se desmonta el componente

  return { data, nextPage, query, setQuery, $searchStore }
}
