import { useGifs } from "../hooks/useGifs"

export default function Grid() {
  const { data, setQuery } = useGifs()

  const handleClick = () => {
    const offset = data.pagination.offset + 5
    setQuery({ limit: 20, offset: offset, query: "anime" })
  }

  console.log(data)

  return (
    <section className="columns-3 gap-x-2 md:columns-4 lg:columns-5 xl:columns-6">
      <button onClick={handleClick}>Siguiente</button>

      {data?.data?.map((gif) => {
        return <img key={gif.id} alt={gif.altText} className="mb-2" src={gif.image.webp} />
      })}

      {/* <div id="observer"></div> */}
    </section>
  )
}
