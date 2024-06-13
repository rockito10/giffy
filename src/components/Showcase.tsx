import { useEffect } from "react"

import { useGifs } from "../hooks/useGifs"
import { useInView } from "../hooks/useInView"
import { Form } from "./Form"
import { Grid } from "./Grid"

export function Showcase() {
  const { data, nextPage, query, setQuery } = useGifs()

  const { inView, ref } = useInView({
    rootMargin: "0px 0px 500px 0px",
  })

  useEffect(() => {
    if (inView) {
      nextPage()
      console.log("inView", inView)
    }
  }, [inView])

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Form setQuery={setQuery} />
        <Grid data={data} query={query} />
        <br />
        <div ref={ref} className="border">
          {/* Observer */}
        </div>
        <br />
      </div>
    </>
  )
}
