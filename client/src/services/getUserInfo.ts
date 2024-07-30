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
