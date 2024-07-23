import { useEffect } from "react"

import { useFetchGifs } from "../hooks/useBorrar"
import { useInView } from "../hooks/useInView"
import { Grid } from "./Grid"

export function InfiniteGrid() {
  const { data, getMoreGifs } = useFetchGifs()

  // const { data, isLoading, error } = useFetch(() => getSearch({ query: "cats" }))

  const { inView, ref } = useInView({
    rootMargin: "0px 0px 500px 0px",
  })

  useEffect(() => {
    getMoreGifs()
  }, [inView])

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Grid data={data} />
        <br />
        <div ref={ref} className="border">
          {/* Observer */}
        </div>
        <br />
      </div>
    </>
  )
}
