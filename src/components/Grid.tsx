import { useGifs } from "../hooks/useGifs"

export default function Grid() {
  const { data, setQuery } = useGifs()

  const handleClick = () => {
    const offset = data.pagination.offset + 5
    setQuery({ offset: offset, query: "anime" })
  }

  return (
    <section className="columns-3 gap-x-2 md:columns-4 lg:columns-5 xl:columns-6">
      <button onClick={handleClick}>Siguiente</button>

      {data?.data?.map((gif) => {
        return (
          <img key={gif.id} alt={gif.alt_text} className="mb-2" src={gif.images.original.webp} />
        )
      })}

      {/* <div id="observer"></div> */}
    </section>
  )
}
