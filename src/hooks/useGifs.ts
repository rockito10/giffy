import { useEffect, useState } from "react"

import type { MappedGifs } from "../types/types"

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
    query, // Este es el estado para usar en React
    data, // Este es el estado para usar en React
  } = useSearchStore()

  const abortController = new AbortController()


  // --------------------------------------------------

  async function fetchDataQuery() {
    if (!query) return

    const data = await getSearch({
      next: "",
      query,
      signal: abortController.signal,
    })

    if (!data) return

    setData(data)
    setQuery(query)
  }

  useEffect(() => {
    setTimeout(fetchDataQuery, 300)

    return () => {
      abortController.abort()
    }
  }, [query])


  // --------------------------------------------------

  // async function fetchDataNext() {
  //   const gifs = await getSearch({ next, query: query, signal: abortController.signal })

  //   setData((previousGifs) => {
  //     if (!gifs) return previousGifs

  //     // combinar las response anteriores con las nuevas
  //     console.log([...previousGifs.gifs, ...gifs.gifs])

  //     return {
  //       data: [...previousGifs.gifs, ...gifs.gifs],
  //       next: gifs.next,
  //     }
  //   })

  //   // $searchStore.set({ data: gifs.data, next: gifs.next })
  // }

  // useEffect(() => {
  //   fetchDataNext()
  // }, [next])

  // ---------------------------------------------

  // [] -> solo se ejecuta cuando se monta el componente
  // [gifParams] -> se ejecuta cuando se monta el componente y cuando gifParams cambie
  // return () => {} -> se ejecuta cuando se desmonta el componente

  return { data, setQuery }
}
