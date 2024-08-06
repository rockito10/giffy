import { getUserInfo } from "../services/getUserInfo"
import type { UserInfo } from "../types/types"
import { useFetch } from "./useFetch"

export function useMe() {
  const { data } = useFetch<UserInfo>({ service: () => getUserInfo({ id: "AsfG8" }) })

  return {
    username: data?.name,
    avatar: data?.img,
    id: data?.id,
  }
}
