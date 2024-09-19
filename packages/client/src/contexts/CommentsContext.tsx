import type { Comment } from "@/types/comments";
import { createContext, useState } from "react";

// ---------- Context ----------

interface CommentsContextType {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  setComments: (comments: Comment[]) => void;
  nextCommentId: number;
  setNextCommentId: (newCommentCount: number) => void;
}

export const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  addComment: () => {},
  setComments: () => {},
  // removeComment: () => {},
  nextCommentId: 0,
  setNextCommentId: () => {},
});

// ---------- Provider ----------

interface Props {
  children: React.ReactNode;
}

export function CommentsContextProvider({ children }: Props) {
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [nextCommentId, setNextCommentId] = useState(0);
  const addComment = (comment: Comment) => {
    setComments((prev) => {
      console.log("PREVIOUS", prev);
      return [...prev, comment];
    });
    setNextCommentId(nextCommentId + 1);
  };

  //   const addAllComments = (comments: Comment[]) => {
  //     setComment(comments);
  //   };

  // const removeComment = (commentId: number) => {
  //   const newComments = comments.filter(
  //     (comment) => comment.comment_id !== commentId
  //   );
  //   setComment(newComments);
  // };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        addComment,
        // removeComment,
        nextCommentId,
        setNextCommentId,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
