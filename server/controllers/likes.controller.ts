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
  res.json(likes?.gif_likes)
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
    await prisma.liked.delete({
      where: {
        user_id_gif_id: {
          gif_id: gifId,
          user_id: userId,
        },
      },
    })
    await upsertDecrement(gifId)
  } else {
    await prisma.liked.create({
      data: {
        gif_id: gifId,
        user_id: userId,
      },
    })
    await upsertInrement(gifId)
  }

  return res.status(202).json({ message: "Like received" })
}
async function upsertInrement(gifId: string) {
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
