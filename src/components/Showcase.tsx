// import { useEffect } from "react"

import { useEffect } from "react"

import { useGifs } from "../hooks/useGifs"
import { useInView } from "../hooks/useInView"
import { Form } from "./Form"
import { Grid } from "./Grid"

// import { $searchStore } from "../store/search"

export function Showcase() {
  const { data, getMoreGifs, setQuery } = useGifs()

  // QUiero usar el store creado en useGifs
  // para acceder a los gifs
  // let search = data
  // if (Object.keys(search).length === 0) {
  //   search = $searchStore.get()
  // }

  // $searchStore.set(data)

  // console.log($searchStore.get())

  // const { $searchData, $searchQuery } = $searchStore.get()

  const { inView, ref } = useInView({
    rootMargin: "0px 0px 500px 0px",
  })

  useEffect(() => {
    getMoreGifs()
  }, [inView])

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Form setQuery={setQuery} />
        <h2>
          Buscando:
          {/* <span className="text-purple-700">{$searchQuery}</span> */}
        </h2>
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
