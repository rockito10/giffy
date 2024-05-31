import type { Gif, GifResponse, MappedGif, MappedGifs } from "../types/types"

export function gifResponseMapper(response: GifResponse): MappedGifs {
  return {
    data: response.results.map((gif) => dataMapper(gif)),
    next: response.next,
  }
}

function dataMapper(data: Gif): MappedGif {
  return {
    alt: data.content_description,
    id: data.id,
    image: data.media_formats.gif.url,
    tags: data.tags,
    title: data.title,
  }
}
