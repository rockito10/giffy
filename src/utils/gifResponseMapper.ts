export function gifResponseMapper(gifs: GifResponse) {
  const data = gifs.data.map((gif) => dataMapper(gif))

  return {
    data,
    pagination: gifs.pagination,
  }
}

function dataMapper(data: Gif) {
  return {
    altText: data.alt_text,
    author: data.username,
    id: data.id,
    image: data.images.original,
    title: data.title,
  }
}
