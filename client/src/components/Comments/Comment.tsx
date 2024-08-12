import { useMe } from "../../hooks/useMe"
import { Avatar } from "../Avatar"
import { DeleteComment } from "./DeleteComment"

interface Props {
  username: string
  avatar: string
  comment: string
}

export function Comment({ username, avatar, comment }: Props) {
  // const { username } = useMe()

  return (
    <li className="relative flex w-2/3 items-center border border-white/70">
      <div className="flex w-full items-center gap-4">
        {/* ... */}

        <div className="flex flex-col items-center border-r border-white/50 p-[1vw]">
          <Avatar name={username} src={avatar} />
          <h3 className="text-sm font-bold">{username} </h3>
        </div>

        {/* ... */}

        <span>{comment}</span>
        <span className="absolute -bottom-4 -right-4 z-10">
          <DeleteComment />
          {
            // ID_USER === ID_USER_QUE_DE_LA_BASE_DE_DATOS && <DeleteComment />prima
          }
        </span>
      </div>
    </li>
  )
}
