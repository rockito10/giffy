import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import type { MappedGifs } from "../types/types"

interface Props {
  data: MappedGifs
  query: string
}

export function Grid({ data, query }: Props) {
  if (!query) return

  // console.log(data.data)

  return (
    data.data.length > 0 && (
      <section>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4, 1280: 6 }}>
          <Masonry className="space-x-2.5">
            {data.data.map((gif) => (
              <a key={gif.id} href={`gif/${gif.id}`}>
                <img
                  alt={gif.alt}
                  className="mt-2.5 transition-transform hover:scale-110"
                  src={gif.images.tinygif}
                />
              </a>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>
    )
  )
}
