import { useQuery } from "@tanstack/react-query"
import type { UserInfo } from "../types/types"
import { getUser } from "../services/services"

export function useMe() {
  const { data } = useQuery<UserInfo>({
    queryKey: ["me"],
    queryFn: () => getUser(10),
  })

  return {
    username: data?.user_name,
    avatar: data?.avatar,
    id: data?.user_id,
  }
}
