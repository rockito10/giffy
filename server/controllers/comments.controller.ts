import type { Request, Response } from "express"
import { prisma } from "../config/client"
import { giffyDb } from "../database/databaseOps"
import { postGifComment } from "../helpers/postGifComment"

export async function getCommentsController(req: Request, res: Response) {
  const { gifId } = req.params

  const comments = await prisma.comment.findMany({
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
  })

  if (comments) {
    console.log({comments})
    const mappedComments = comments.map((comment) => {
      return {
        comment_id: comment.comment_id,
        gif_id: comment.gif_id,
        text: comment.text,

        ...comment.user,
      }
    })


    return res.status(200).json(mappedComments)
  }

  return res.status(404).json({ message: "Comments not found" })
}

// export async function fetchGifComments(gifId) {
//   //: string
//   const query = `SELECT num, gif_id, usuario.name, text, img FROM comentario JOIN usuario ON usuario.name = comentario.name WHERE gif_id = '${gifId}' ORDER BY num DESC`

//   try {
//     const comments = await giffyDb.queryDatabase({ query })

//     const mappedComments = comments?.rows.map((comment) => {
//       return {
//         comment_num: comment.num,
//         gif_id: comment.gif_id,
//         username: comment.name,
//         comment: comment.text,
//         avatar: comment.img,
//       }
//     })

//     if (!comments) {
//       return null
//     }

//     return mappedComments
//   } catch (err) {
//     console.error("Error al consultar la base de datos", err)
//     return { message: "Error al consultar la base de datos" }
//   }
// }

export async function sendCommentController(req: Request, res: Response) {
  const { gifId } = req.params
  const { commentText, userId } = req.body

  console.log("========================================")
  console.log(req.body)
  console.log("========================================")

  const gifExists =
    (await prisma.gif.count({
      where: {
        gif_id: gifId,
      },
    })) !== 0

  if (!gifExists) {
    await prisma.gif.create({
      data: {
        gif_id: gifId,
        gif_likes: 0,
      },
    })
  }
  const aggregate = await prisma.comment.aggregate({
    _max: {
      comment_id: true
    },
    where: {
      gif_id: gifId
    }
  })

  
  const nextCommentId = (aggregate._max?.comment_id ?? 0) + 1;

  const gifInfo = await prisma.comment.create({
    data: {
      comment_id: nextCommentId,
      gif_id: gifId,
      text: commentText,
      user_id: userId
    }
  })

  res.status(201).json(gifInfo)

}
