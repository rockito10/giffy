import { Comments } from "./Comments";
import { NewComment } from "./NewComment";

export function CommentContainer() {
  return (
      <section className="space-y-6">
      <NewComment/>
      <Comments/>
    </section>
  );
}
