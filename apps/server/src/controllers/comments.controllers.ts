import { db } from "@/config/db";
import type { Request, Response } from "express";

export async function getCommentsController(req: Request, res: Response) {
  const { gifId } = req.params;

  const comments = await db.comment.findMany({
    select: {
      comment_id: true,
      gif_id: true,
      text: true,
      user: {
        select: {
          user_id: true,
          avatar: true,
          user_name: true,
        },
      },
    },
    where: {
      gif_id: gifId,
    },
    orderBy: {
      comment_id: "desc",
    },
  });

  if (comments) {
    // console.log({ comments })

    const mappedComments = comments.map((comment) => {
      return {
        comment_id: comment.comment_id,
        gif_id: comment.gif_id,
        text: comment.text,

        ...comment.user,
      };
    });

    return res.status(200).json({mappedComments, nextCommentId: mappedComments.length+1 });
  }

  return res.status(404).json({ message: "Comments not found" });
}

export async function sendCommentController(req: Request, res: Response) {
  const { gifId } = req.params;
  const { commentText, userId } = req.body;

  const maxQuery = await db.comment.aggregate({
    _max: {
      comment_id: true,
    },
    where: {
      gif_id: gifId,
    },
  });

  const nextCommentId = (maxQuery._max?.comment_id ?? 0) + 1;

  await createGifWithComment(gifId, { commentText, userId, nextCommentId });

  res.status(201).json({ message: "Comment created" });
}

// import { prisma } from "../config/client"

interface Comment {
  nextCommentId: number;
  commentText: string;
  userId: string;
}

export async function createGifWithComment(
  gifId: string,
  { commentText, userId, nextCommentId }: Comment
) {
  await db.gif_interactions.upsert({
    where: {
      gif_id: gifId,
    },

    // Creamos el GIF si no existe
    create: {
      gif_id: gifId,
      gif_likes: 0,

      comment: {
        create: {
          comment_id: nextCommentId,
          text: commentText,
          user_id: userId,
        },
      },
    },

    // Creamos el comentario asociado al GIF si este existe
    update: {
      comment: {
        create: {
          comment_id: nextCommentId,
          text: commentText,
          user_id: userId,
        },
      },
    },
  });
}

export async function deleteCommentController(req: Request, res: Response) {
  const { gifId } = req.params;
  const { commentId, userId } = req.body;

  // console.table({
  //   "GIF ID": gifId,
  //   "Comment ID": commentId,
  //   "User ID": userId,
  // });
  // console.log(req.params)

  const response = await db.comment.delete({
    where: {
      gif_id_user_id_comment_id: {
        gif_id: gifId,
        user_id: userId,
        comment_id: commentId,
      },
    },
  });

  if (response) {
    return res.status(200).json({ message: "Comment deleted" });
  }

  return res.status(404).json({ message: "Comments not found" });
}
