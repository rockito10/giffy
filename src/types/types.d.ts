export interface GifResponse {
  next: string
  results: Gif[]
}

export interface Gif {
  content_description: string
  created: number
  flags: string[]
  hasaudio: boolean
  id: string
  itemurl: string
  media_formats: Record<string, Metadata>
  tags: string[]
  title: string
  url: string
}

export interface Metadata {
  dims: number[]
  duration: number
  preview: string
  size: number
  url: string
}

// ------------------------------

interface MappedGifs {
  data: MappedGif[]
  next: string
}

interface MappedGif {
  alt: string
  id: string
  image: string
  tags: string[]
  title: string
}
