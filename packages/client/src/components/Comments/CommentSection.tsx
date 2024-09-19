import { Comments } from "./Comments";
import { NewComment } from "./NewComment";
import { useCommentsContext } from "@/hooks/useCommentsContext";

export function CommentSection() {
  const { comments } = useCommentsContext();

  if (!comments) return <div>No comments</div>;

  return (
    <section className="space-y-6">
      <NewComment isFirstComment={!comments.length} />
      <Comments data={comments} />
    </section>
  );
}
