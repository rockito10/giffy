import { Avatar } from "@/components/Avatar";
import { useMe } from "@/hooks/useMe";
import { useParams } from "wouter";
import { DeleteComment } from "./DeleteComment";

interface Props {
  username: string;
  avatar: string;
  comment: string;
  commentId: number;
  userId: string;
}

export function CommentComponent({
  username,
  avatar,
  comment,
  commentId,
  userId,
}: Props) {
  // const { username } = useMe()

  const { id: gifId } = useParams();
  const { id: currentUserId } = useMe();

  const handleDelete = (evt: React.ChangeEvent<HTMLButtonElement>) => {};

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
      </div>
      <span className="absolute -bottom-4 -right-4 z-10">
        {currentUserId === userId && (
          <DeleteComment commentId={commentId} gifId={gifId!} />
        )}
      </span>
    </li>
  );
}
