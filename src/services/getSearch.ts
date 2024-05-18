interface Props {
  offset: number
  query: string
}

export async function getSearch({ offset, query }: Props): Promise<GifResponse> {
  const resp = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=RSJ0OS9rA7vBucO3qPhE24JPZNesxvdF&q=${query}&limit=5&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`,
  )
  const data = await resp.json()
  return data
}
