import { fetchComments } from "@/services/services";
import type { Comment } from "@/types/comments";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

// ---------- Context ----------

interface CommentsContextType {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  setComments: (comments: Comment[]) => void;
  // commentCount: number;
  //   setCommentCount: (newCommentCount: number) => void;
}

export const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  addComment: () => {},
  setComments: () => {},
  // removeComment: () => {},
  // commentCount: 0,
  //   setCommentCount: () => {},
});

// ---------- Provider ----------

interface Props {
  children: React.ReactNode;
}

export function CommentsContextProvider({ children }: Props) {
  const [comments, setComments] = useState<Comment[] | []>([]);
  // const [commentCount, setCommentCount] = useState<number>(data ?? 0);

  const addComment = (comment: Comment) => {
    setComments((prev) => {
      return [...prev, comment];
    });
    // setCommentCount(commentCount + 1);
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
        // commentCount,
        // setCommentCount,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
