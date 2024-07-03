import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Frame } from "./Frame"

import type { MappedGifs } from "../types/types"

interface Props {
  data: MappedGifs | null
}

export function Grid({ data }: Props) {
  const gifs = data?.gifs

  if (!gifs) return null

  return (
    <section>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4, 1280: 6 }}>
        <Masonry className="space-x-2.5">
          {gifs.map(({ id, alt, images }) => (
            <Frame key={id} id={id} alt={alt} src={images.tinygif} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  )
}
