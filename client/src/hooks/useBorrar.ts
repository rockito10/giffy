import { useEffect } from "react"

import { getSearch } from "../services/getSearch"
import { useGiffyContext } from "./useGiffyContext"

export function useFetchGifs() {
  const { data, query, setQuery, setData } = useGiffyContext()

  // const firstUpdate = useRef(true)

  const abortController = new AbortController()

  // --------------------------------------------------

  async function fetchDataQuery() {
    if (!query) return

    const data = await getSearch({ next: "", query, signal: abortController.signal })

    if (!data) return

    setData(data)
  }

  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false
    //   return
    // }

    fetchDataQuery()

    return () => {
      abortController.abort()
    }
  }, [query])

  // --------------------------------------------------

  async function getMoreGifs() {
    if (!query) return

    const newGifs = await getSearch({
      next: data.next,
      query: query,
      signal: abortController.signal,
    })

    if (!newGifs) return

    // ESTO ESTA MAL
    setData({
      gifs: [...data.gifs, ...newGifs.gifs],
      next: newGifs.next,
    })
  }

  // --------------------------------------------------

  // useEffect Dependencies
  // []                -> solo se ejecuta cuando se monta el componente
  // [params]          -> se ejecuta cuando se monta el componente y cuando params cambie
  // return () => {}   -> se ejecuta cuando se desmonta el componente

  return { data, getMoreGifs, query, setQuery }
}
