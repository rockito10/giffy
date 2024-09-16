// import { CommentsContextProvider } from "@/contexts/CommentsContext";
// import { fetchComments } from "@/services/services";
// import type { CommentsResponse } from "@/types/comments";
// import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Comments } from "./Comments";
import { NewComment } from "./NewComment";
import { useCommentsContext } from "@/hooks/useCommentsContext";
// import { useCommentsContext } from "@/hooks/useCommentsContext";

export function CommentSection() {
  //   const { id: gifId } = useParams();

  const { comments } = useCommentsContext();

  //   const { data } = useQuery<CommentsResponse>({
  //     queryKey: ["comments", gifId],
  //     queryFn: () => fetchComments(gifId as string),
  //   });

  //   const { fetchComments } = useCommentsContext();
  //   const { data } = fetchComments();

  if (!comments) return <div>No comments</div>;

  return (
    <section className="space-y-6">
      <NewComment isFirstComment={!comments.length} />
      <Comments data={comments} />
    </section>
  );
}
