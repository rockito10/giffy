import { Avatar } from "../Avatar"

interface Props {
  username: string
  avatar: string
  comment: string
}

export function Comment({  username, avatar, comment }: Props) {
  return (
    <li
      className="flex w-2/3 items-center gap-x-8 border border-white/70 p-[0.5vw]"
    >
      <div className="flex flex-col items-center">
        <Avatar name={username} src={avatar} />
        <h3 className="font-bold">{username} </h3>
      </div>
      <span>{comment}</span>
    </li>
  )
}
