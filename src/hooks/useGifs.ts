import { useEffect, useState } from "react"

import { getSearch } from "../services/getSearch"

export function useGifs() {
  const [data, setData] = useState<MappedGifs>({
    data: [],
    pagination: { count: 0, offset: 0, total_count: 0 },
  })

  const [gifParams, setGifParams] = useState({ limit: 20, offset: 0, query: "anime" }) // default

  useEffect(() => {
    getSearch({ limit: gifParams.limit, offset: gifParams.offset, q: gifParams.query }).then(
      (gifs) =>
        setData((previousGifs) => {
          // combinar las response anteriores con las nuevas
          return {
            data: [...previousGifs.data, ...gifs.data],
            pagination: gifs.pagination,
          }
        }),
    )
    // return () => {} // cleanup
  }, [gifParams])
  // [] -> solo se ejecuta cuando se monta el componente
  // [gifParams] -> se ejecuta cuando se monta el componente y cuando gifParams cambie
  // return () => {} -> se ejecuta cuando se desmonta el componente

  return { data, setQuery: setGifParams }
}
