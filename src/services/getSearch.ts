import { gifResponseMapper } from "../utils/gifResponseMapper"

// const API_KEY = "WSqVYG5DTwIXqSoXvaohWrj8qCtjO6zZ"
// const HEAD = "https://api.giphy.com/v1/gifs/search?"
// const QUERY = "&q="
// const LIMIT = "&limit=20"
// const OFFSET = "&offset="
// const TAIL = "&rating=g&lang=en&bundle=messaging_non_clips"

// console.log(API_KEY)
// RSJ0OS9rA7vBucO3qPhE24JPZNesxvdF

// const GIFFY = {}

// const BASE_URL = "https://api.giphy.com/v1/gifs/search"
// const LIMIT = "20"
// const OFFSET = "20"
// const QUERY = "ANIME"

// const URL = new URLSearchParams({
//   api_key: API_KEY,
//   limit: LIMIT,
//   offset: OFFSET,
//   q: QUERY,
// })

interface SearchParams {
  limit: number
  offset: number
  q: string
}

const GIFFY = {
  BASE_URL: "https://api.giphy.com/v1/gifs/search",

  createParams: function ({ limit, offset, q }: SearchParams) {
    return new URLSearchParams({
      api_key: "WSqVYG5DTwIXqSoXvaohWrj8qCtjO6zZ",
      limit: String(limit),
      offset: String(offset),
      q,
    })
  },
}

export async function getSearch({ limit, offset, q }: SearchParams): Promise<MappedGifs> {
  const URL = GIFFY.createParams({ limit, offset, q })

  const resp = await fetch(GIFFY.BASE_URL + "?" + URL.toString())
  const data = await resp.json()

  return gifResponseMapper(data)
}
