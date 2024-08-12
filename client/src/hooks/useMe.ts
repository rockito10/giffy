import { getUserInfo } from "../services/getUserInfo"
import type { UserInfo } from "../types/types"
import { useFetch } from "./useFetch"

export function useMe() {
  const { data } = useFetch<UserInfo>({ service: () => getUserInfo({ user_id: "10" }) })

  return {
    username: data?.user_name,
    avatar: data?.avatar,
    id: data?.user_id,
  }
}
