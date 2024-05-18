interface GifResponse {
  data: Gif[] | never[]
  meta: Meta | object
  pagination: Pagination
}

interface Gif {
  alt_text: string
  analytics: Analytics
  analytics_response_payload: string
  bitly_gif_url: string
  bitly_url: string
  content_url: string
  embed_url: string
  id: string
  images: Images
  import_datetime: Date
  is_sticker: number
  rating: string
  slug: string
  source: string
  source_post_url: string
  source_tld: string
  title: string
  trending_datetime: string
  type: string
  url: string
  username: string
}

interface Analytics {
  onclick: Onclick
  onload: Onclick
  onsent: Onclick
}

interface Onclick {
  url: string
}

interface Images {
  fixed_height: FixedHeight
  fixed_height_downsampled: FixedHeight
  fixed_height_small: FixedHeight
  fixed_width: FixedHeight
  fixed_width_downsampled: FixedHeight
  fixed_width_small: FixedHeight
  original: FixedHeight
}

interface FixedHeight {
  frames?: string
  hash?: string
  height: string
  mp4?: string
  mp4_size?: string
  size: string
  url: string
  webp: string
  webp_size: string
  width: string
}

interface Meta {
  msg: string
  response_id: string
  status: number
}

interface Pagination {
  count: number
  offset: number
  total_count: number
}
