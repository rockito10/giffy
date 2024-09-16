import { CommentsContext } from "@/contexts/CommentsContext";
import { fetchComments } from "@/services/services";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useParams } from "wouter";

export function useCommentsContext() {
  const { id } = useParams();

  if (!id) return;

  // Peticion a la base de datos
  const { data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
  });

  const { comments, addComment, setComments } = useContext(CommentsContext);

  useEffect(() => {
    if (data?.length > 0) {
      setComments(data);
    }
  }, [data]);

  return { comments, addComment };
}
