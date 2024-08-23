import { useEffect, useRef } from "react"

import { getSearch } from "../services/getSearch"
import { useGiffyContext } from "./useGiffyContext"
import { useParams } from "wouter"

export function useFetchGifs() {
  const { data, setData, concatData } = useGiffyContext()

  const { query } = useParams()

  const firstUpdate = useRef(true)

  const abortController = new AbortController()

  // --------------------------------------------------

  const fetchDataQuery = async () => {
    if (!query) return

    const data = await getSearch({ next: "", query, signal: abortController.signal })

    if (!data) return

    setData(data)
  }

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

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
    concatData(newGifs)
  }

  // --------------------------------------------------

  return { data, getMoreGifs }
}
