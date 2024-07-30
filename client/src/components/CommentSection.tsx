import type { GifComments } from "../types/types"
import { Avatar } from "./Avatar"

interface Props {
  comments: GifComments | null
}

export default function CommentSection({ comments }: Props) {
  if (comments?.length === 0) {
    return <form action="#">
       <p className="">No comments yet. Be the first to comment!</p>
       <input type="text" className="w-2/3 text-black px-2 py-3"   />
    </form>
  }

  return (
    <div className="flex flex-col">
      <ul className="space-y-4">
        {comments?.map(({ comment_num, username, avatar, comment }) => (
          <li
            key={comment_num}
            className="flex w-2/3 items-center gap-x-8 border border-white/70 p-[0.5vw]"
          >
            <div className="flex flex-col items-center">
              <Avatar name={username} src={avatar} />
              <h3 className="font-bold">{username} </h3>
            </div>
            <span>{comment}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
