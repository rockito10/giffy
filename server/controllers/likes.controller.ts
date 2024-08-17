import type { Request, Response } from "express"
import { prisma } from "../config/client"

export async function getLikes(req: Request, res: Response) {
  const { gifId } = req.params
  const likes = await prisma.gif.findUnique({
    where: {
      gif_id: gifId,
    },
    select: {
      gif_likes: true,
    },
  })
  const isLiked = await prisma.liked.findUnique({
    where: {
      user_id_gif_id: {
        user_id: "10",
        gif_id: gifId,
      },
    },
  })
  res.json({ likesNumber: likes?.gif_likes, isLiked: !!isLiked })
}

export async function postLikes(req: Request, res: Response) {
  const { gifId } = req.params
  const userId: string = req.body.userId

  if (!userId) {
    // Manejar el caso en el que `userId` no esté presente
    return res.status(400).json({ error: "User ID is required" })
  }

  const isLiked = await prisma.liked.findUnique({
    where: {
      user_id_gif_id: {
        user_id: userId,
        gif_id: gifId,
      },
    },
  })

  if (isLiked) {
    await upsertDecrement(gifId)

    await prisma.liked.delete({
      where: {
        user_id_gif_id: {
          gif_id: gifId,
          user_id: userId,
        },
      },
    })
  } else {
    await upsertIncrement(gifId)

    await prisma.liked.create({
      data: {
        gif_id: gifId,
        user_id: userId,
      },
    })
  }

  return res.status(202).json({ message: "Like received" })
}
async function upsertIncrement(gifId: string) {
  await prisma.gif.upsert({
    where: {
      gif_id: gifId,
    },
    create: {
      gif_id: gifId,
      gif_likes: 1,
    },
    update: {
      gif_likes: {
        increment: 1,
      },
    },
  })
}

async function upsertDecrement(gifId: string) {
  await prisma.gif.upsert({
    where: {
      gif_id: gifId,
    },
    create: {
      gif_id: gifId,
      gif_likes: 1,
    },
    update: {
      gif_likes: {
        decrement: 1,
      },
    },
  })
}
