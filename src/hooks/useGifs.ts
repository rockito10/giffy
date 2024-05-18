import { useEffect, useState } from "react"

import { getSearch } from "../services/getSearch"

export function useGifs() {
  const [data, setData] = useState<GifResponse>({
    data: [],
    meta: {},
    pagination: { count: 0, offset: 0, total_count: 0 },
  })

  const [gifParams, setGifParams] = useState({ offset: 0, query: "anime" }) // default

  useEffect(() => {
    getSearch({ offset: gifParams.offset, query: gifParams.query }).then((gifs) =>
      setData((previousGifs) => {
        // combinar las response anteriores con las nuevas
        return {
          data: [...previousGifs.data, ...gifs.data],
          meta: gifs.meta,
          pagination: gifs.pagination,
        }
      }),
    )
  }, [gifParams]) // Cuando se monta el componente, cuando se actualiza el componente y cuando se desmonta el componente

  return { data, setQuery: setGifParams }
}
