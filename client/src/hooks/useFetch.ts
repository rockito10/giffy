import { useEffect, useState } from "react"

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)

    try {
      // const data = await service()
      const resp = await fetch(url, options)
      const data = await resp.json()
      setData(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // useCallback()
  }, [])

  // useEffect Dependencies
  // []                -> solo se ejecuta cuando se monta el componente
  // [dependencies]    -> se ejecuta cuando se monta el componente y cuando [dependencies] cambie
  // return () => {}   -> se ejecuta cuando se desmonta el componente

  return { data, isLoading, error, fetchData }
}
