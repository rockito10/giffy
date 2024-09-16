import { useMe } from "@/hooks/useMe";
import { useCommentsContext } from "@/hooks/useCommentsContext";
import type { Comment } from "@/types/comments";
import { useParams } from "wouter";

interface Props {
  isFirstComment: boolean;
}

export function NewComment({ isFirstComment }: Props) {
  const { id } = useParams();

  const { addComment, commentCount: nextCommentId } = useCommentsContext();
  const { avatar, username, id: userId } = useMe();

  // const commentId = comments.length + commentCount + 1

  // const { fetchData } = useFetch(`/api/comments/${id}`)

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // Post Comment
    const commentText = evt.currentTarget.querySelector("textarea")?.value;
    if (!commentText || !avatar || !username || !userId) return;
    //

    const infoToSend = {
      commentText,
      userId,
      // ID DE PEPE
      // IDE DEL COMENTARIO
    };

    // ACTUALIZACION OPTIMISTA (Add comment to UI)

    const optCom: Comment = {
      avatar,
      comment_id: nextCommentId,
      text: commentText,
      gif_id: id!,
      user_name: username,
      user_id: userId,
    };

    console.log("optCom", optCom);

    addComment(optCom);

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoToSend),
      });

      if (response.status === 201) {
        // Confirmamos que el comentario se ha enviado
      }

      if (response.status !== 201) {
        // Mostrar mensaje de error
      }
    } catch (error) {
      // Mostrar mensaje de error
      console.log("Error al enviar el comentario", error);
    }

    // Clear textarea
    const textarea = evt.currentTarget.querySelector("textarea");
    if (textarea) textarea.value = "";
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
          className="h-16 w-full resize-none rounded-lg border border-white/70 bg-black p-2 text-white"
          placeholder="Your comment here!"
        />
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button className="rounded-xl border px-3 py-2 transition-colors hover:bg-white hover:text-black">
          Comment
        </button>
      </div>
    </form>
  );
}
