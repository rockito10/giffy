import { useEffect } from "react"

import { getSearch } from "../services/getSearch"
import { searchStore } from "../store/searchStore"
import { useSearchStore } from "./useSearchStore"

export function useGifs() {
  const {
    // data, // Este es el estado para usar en JavaScript
    // query, // Este es el estado para usar en JavaScript
    setData,
    setQuery,
  } = searchStore

  const {
    data, // Este es el estado para usar en React
    query, // Este es el estado para usar en React
    // setData,
    // setQuery
  } = useSearchStore()

  const abortController = new AbortController()

  // --------------------------------------------------

  async function fetchDataQuery() {
    if (!query) return

    const data = await getSearch({
      next: "", // Opcional
      query,
      signal: abortController.signal,
    })

    if (!data) return

    setData(data)
    setQuery(query)
  }

  // useCallback(() => {}, [query])

  useEffect(() => {
    setTimeout(fetchDataQuery, 300)

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
