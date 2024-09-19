import { CommentsContext } from "@/contexts/CommentsContext";
import { fetchComments } from "@/services/services";
import { Comment } from "@/types/comments";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useParams } from "wouter";

export function useCommentsContext() {
  console.log("USEQUERY");

  const { id }: { id: string } = useParams();

  const { comments, addComment, setComments, nextCommentId, setNextCommentId } =
    useContext(CommentsContext);

  const { data } = useQuery<Comment[]>({
    // CAMBIAR ESTO DE LUGAR
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setComments(data);

    if (data.length === 0) {
      setNextCommentId(1);
    } else {
      setNextCommentId(data[data.length - 1].comment_id + 1); //último comentario
    }
  }, []);

  return { comments, addComment, nextCommentId };
}
