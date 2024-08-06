// type Id = `${string}-${string}-${string}-${string}-${string}`

type Id = string

interface GetUserInfo {
  id: Id
}

interface UserInfo {
  img: string | null
  name: string
  id: Id
}

export async function getUserInfo({ id }: GetUserInfo): Promise<UserInfo> {
  const resp = await fetch(`/api/user/${id}`)
  const data = await resp.json()

  console.log(data)
  return data
}
