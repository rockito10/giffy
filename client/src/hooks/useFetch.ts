import { useEffect, useState } from "react"

interface Props<T> {
  service: () => Promise<T>
  // dependencies?: any[]
}

export function useFetch<T>({ service }: Props<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const data = await service()
      setData(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect Dependencies
  // []                -> solo se ejecuta cuando se monta el componente
  // [dependencies]    -> se ejecuta cuando se monta el componente y cuando [dependencies] cambie
  // return () => {}   -> se ejecuta cuando se desmonta el componente

  return { data, isLoading, error }
}
