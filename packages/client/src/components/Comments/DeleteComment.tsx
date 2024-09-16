import { useMe } from "@/hooks/useMe";
import { useCommentsContext } from "@/hooks/useCommentsContext";

interface deleteCommentProps {
  gifId: string;
  commentId: number;
}

export function DeleteComment({ commentId, gifId }: deleteCommentProps) {
  const { id: userId } = useMe();

  const { removeComment } = useCommentsContext();

  const deleteComment = async () => {
    removeComment(commentId);
    console.log("userId", userId);

    await fetch(`/api/comments/${gifId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, userId }),
    });
  };

  return (
    <button
      className="flex items-center justify-center rounded border bg-black px-2 py-1 transition-colors hover:bg-white hover:text-black"
      title="Delete comment"
      onClick={deleteComment}
    >
      Remove
    </button>
  );
}
