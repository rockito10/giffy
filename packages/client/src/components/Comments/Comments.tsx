import { useCommentsContext } from "@/hooks/useCommentsContext";
import { Comment } from "./Comment";

export function Comments() {
  const { comments } = useCommentsContext();
  console.log(comments);
  return (
    <ul className="space-y-8">
      {comments?.map(({ comment_id, user_name, avatar, text, user_id }) => (
        <div key={comment_id}>
          <Comment
            avatar={avatar}
            comment={text}
            commentId={comment_id}
            userId={user_id}
            username={user_name}
          />
        </div>
      ))}
    </ul>
  );
}
