import { useEffect } from "react"

import { useGifs } from "../hooks/useGifs"
import { useInView } from "../hooks/useInView"
import { Form } from "./Form"
import { Grid } from "./Grid"

export function Showcase() {
  const { data, nextPage, query, setQuery } = useGifs()
  const { inView, ref } = useInView()

  useEffect(() => {
    if (inView) {
      nextPage()
      console.log("inView", inView)
    }
  }, [inView])

  return (
    <>
      <div>
        <Form setQuery={setQuery} />
        <Grid data={data} query={query} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div ref={ref} className="border">
          {/* Observer */}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  )
}
