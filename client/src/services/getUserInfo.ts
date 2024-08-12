// type Id = `${string}-${string}-${string}-${string}-${string}`

type Id = string

interface GetUserInfo {
  user_id: Id
}

interface UserInfo {
  avatar: string | null
  user_name: string
  user_id: Id
}

export async function getUserInfo({ user_id }: GetUserInfo): Promise<UserInfo> {
  const resp = await fetch(`/api/user/${user_id}`)
  const data = await resp.json()
  return data
}
