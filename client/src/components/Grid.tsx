import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import type { MappedGifs } from "../types/types"

import { Frame } from "./Frame"

interface Props {
  data: MappedGifs | null
}

export function Grid({ data }: Props) {
  const gifs = data?.gifs

  if (!gifs) return null

  return (
    <ResponsiveMasonry
      className="w-full"
      columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1280: 5, 1440: 6 }}
    >
      <Masonry className="space-x-2.5">
        {gifs.map(({ alt, id, images }) => (
          <Frame key={id} alt={alt} className="mt-2.5" id={id} src={images.tinygif} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}
