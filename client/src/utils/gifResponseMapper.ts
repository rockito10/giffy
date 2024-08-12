import type { Gif, GifResponse, MappedGif, MappedGifs } from "../types/types"

export function gifResponseMapper(response: GifResponse): MappedGifs {
  return {
    gifs: response.results.map((gif) => dataMapper(gif)),
    next: response.next,
  }
}

export function dataMapper(data: Gif): MappedGif {
  return {
    alt: data.content_description,
    // original: data.media_formats.gif.url,
    id: data.id,
    images: {
      gif: data.media_formats.gif?.url,
      mp4: data.media_formats.mp4?.url,
      tinygif: data.media_formats.tinygif?.url,
      webp: data.media_formats.webp?.url,
    },
    tags: data.tags,
    title: data.title,
  }
}
