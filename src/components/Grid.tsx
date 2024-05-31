import { useGifs } from "../hooks/useGifs"
// import { Form } from "./Form.tsx"

export function Grid() {
  const { data } = useGifs()

  return (
    <section className="columns-3 gap-x-2 md:columns-4 lg:columns-5 xl:columns-6">
      {/* <Form /> */}

      {data?.data?.map((gif) => {
        return <img key={gif.id} alt={gif.alt} className="mb-2" src={gif.image} />
      })}

      {/* <div id="observer"></div> */}
    </section>
  )
}
