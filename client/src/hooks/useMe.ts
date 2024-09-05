import { useQuery } from "@tanstack/react-query"
import type { UserInfo } from "../types/types"
import { getUser } from "../services/services"
import { useState } from "react"

export function useMe() {
  const setUserId = (id: string) => {
    localStorage.setItem("userId", id)
  }

  const getUserId = () => {
    return localStorage.getItem("userId") ?? "10"
  }

  const { data } = useQuery<UserInfo>({
    queryKey: ["me"],
    queryFn: () => getUser(getUserId()),
  })

  return {
    username: data?.user_name,
    avatar: data?.avatar,
    id: data?.user_id,
    setUserId,
    getSavedUserId: getUserId,
  }
}
