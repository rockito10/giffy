import type { MappedGifs } from "../types/types"

export function Grid({ data }: { data: MappedGifs }) {
  return (
    // Quisiera que muestre colunms pero sin que las nuevas imagenes se agregen a la derecha de las anteriores
    // sino que se agreguen debajo de las anteriores
    // y que el contenedor se ajuste al tamaño de las imagenes
    // y que las imagenes se ajusten al tamaño del contenedor

    <section className="columns-3 gap-x-2 md:columns-4 lg:columns-5 xl:columns-6">
      {data?.data?.map((gif) => {
        return <img key={gif.id} alt={gif.alt} className="mb-2" src={gif.image} />
      })}

      {/* <div id="observer"></div> */}
    </section>
  )
}
