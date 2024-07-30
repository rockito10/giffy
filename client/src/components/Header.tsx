import type { UserInfo } from "../types/types"
import { getUserInfo } from "../services/getUserInfo"
import { useFetch } from "../hooks/useFetch"
import { Avatar } from "./Avatar"
import { Form } from "./Form"

export function Header() {
  const { data: userInfo } = useFetch<UserInfo>({ service: () => getUserInfo({ id: 1 }) })

  return (
    <header className="bg-black">
      <div className="flex items-center justify-between px-8 py-2">
        <Form />
        {userInfo && (
          <div>
            <Avatar name={userInfo.name} src={userInfo.img} />
            <h3>{userInfo.name}</h3>
          </div>
        )}
      </div>
    </header>
  )
}
