import { useMe } from "../hooks/useMe"
import { Avatar } from "./Avatar"
import { Form } from "./Form"

export function Header() {
  const { avatar, username } = useMe()

  if (!username) return null

  return (
    <header className="bg-black">
      <div className="flex items-center justify-between px-8 py-2">
        <Form />

        <div>
          <Avatar name={username} src={avatar} />
          <h3>{username}</h3>
        </div>
      </div>
    </header>
  )
}
