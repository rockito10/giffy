// import type { MappedGif } from "../types/types"
// import { dataMapper } from "../utils/gifResponseMapper"

// interface GetGifDetails {
//   id: string | undefined
// }

// export async function getGifDetails({ id }: GetGifDetails): Promise<MappedGif> {
//   const { VITE_TENOR_API_KEY: TENOR_API_KEY } = import.meta.env
//   const URL = `https://tenor.googleapis.com/v2/posts?key=${TENOR_API_KEY}&ids=${id}`

//   const resp = await fetch(URL)
//   const data = await resp.json()

//   return dataMapper(data.results[0])
// }

// type Id = `${string}-${string}-${string}-${string}-${string}`

type Id = number

interface GetUserInfo {
  id: Id
}

interface UserInfo {
  img: string
  name: string
  id: Id
}

export async function getUserInfo({ id }: GetUserInfo): Promise<UserInfo> {
  const URL = `http://localhost:3000/user/${id}`

  console.log(URL)

  const resp = await fetch(URL)
  const data = await resp.json()

  console.log(data)
  return data
}
