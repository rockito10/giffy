import type { UserInfo } from "../types/types"
import { useFetch } from "./useFetch"

export function useMe() {
  const { data } = useFetch<UserInfo>(`/api/user/${10}`)

  return {
    username: data?.user_name,
    avatar: data?.avatar,
    id: data?.user_id,
  }
}
