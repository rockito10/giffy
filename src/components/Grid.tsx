import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import type { MappedGifs } from "../types/types"

interface Props {
  data: MappedGifs
  query: string
}

export function Grid({ data, query }: Props) {
  if (!query) return

  return (
    data.data.length > 0 && (
      <section>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4, 1280: 6 }}>
          <Masonry className="space-x-2.5">
            {data.data.map((gif) => (
              <img key={gif.id} alt={gif.alt} className="mt-2.5" src={gif.image} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>
    )
  )
}
