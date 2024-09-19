import { useMe } from "@/hooks/useMe";
import { useCommentsContext } from "@/hooks/useCommentsContext";
import type { Comment } from "@/types/comments";
import { useParams } from "wouter";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "@/services/services";

interface Props {
  isFirstComment: boolean;
}

export function NewComment({ isFirstComment }: Props) {
  const { id: gifId }: { id: string } = useParams();

  const { addComment, nextCommentId } = useCommentsContext();
  const { avatar, username, id: userId } = useMe();

  const { mutate } = useMutation({
    mutationFn: postComment,
  });

  // Post Comment

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const textarea = textareaRef.current;

    // Comprobaciones
    if (!textarea || !avatar || !username || !userId) return;

    const commentText = textarea.value;

    // Crear comentario
    const comment: Comment = {
      avatar,
      comment_id: nextCommentId,
      text: commentText,
      gif_id: gifId!,
      user_name: username,
      user_id: userId,
    };

    //añadir comentario a la base de datos y a comment section
    mutate({ commentText, userId, gifId });
    addComment(comment);

    // Limpiar texta
    textarea.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      {isFirstComment ? (
        <p className="w-fit px-2 py-1">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <p className="w-fit px-2 py-1">Add a comment</p>
      )}
      <div className="flex w-2/3 flex-col items-start gap-4">
        {nextCommentId}
        <textarea
          ref={textareaRef}
          className="h-16 w-full resize-none rounded-lg border border-white/70 bg-black p-2 text-white"
          placeholder="Your comment here!"
          onKeyDown={(evt) => {
            if (evt.key === "Enter" && !evt.shiftKey) {
              const form = evt.currentTarget.closest("form"); // Obtener el formulario
              if (form) {
                form.requestSubmit(); // Enviar el formulario
              }
            }
          }}
        />
        <button
          className="rounded-xl border px-3 py-2 transition-colors hover:bg-white hover:text-black"
          type="button"
        >
          Comment
        </button>
      </div>
    </form>
  );
}
