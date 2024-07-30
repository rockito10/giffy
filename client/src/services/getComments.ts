export async function getComments(id: string | undefined) {
  const URL = `http://localhost:3000/comments/${id}`

  const resp = await fetch(URL)
  const data = await resp.json()

  return data
}
