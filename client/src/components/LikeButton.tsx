import { useState } from "react"
import { useParams } from "wouter"
import { useFetch } from "../hooks/useFetch"
import { useMe } from "../hooks/useMe"

interface Props {
  gifId: string | undefined
  initialLikes: number | null
}

export function LikeButton({ gifId, initialLikes }: Props) {
  // const { data: likes, isLoading, error } = useFetch<number>(`/api/likes/${gifId}`)

  const [likesNumber, setLikesNumber] = useState(initialLikes ?? 0)

  const [isLiked, setIsLiked] = useState(false)

  const { id: userId } = useMe()

  function handleLike() {
    if (isLiked) {
      setLikesNumber(likesNumber - 1)
      setIsLiked(false)
    } else {
      setLikesNumber(likesNumber + 1)
      setIsLiked(true)
    }

    postLike()
  }

  async function postLike() {
    try {
      const response = await fetch(`/api/likes/${gifId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (response.status === 201) {
        // Confirmamos que el comentario se ha enviado
      }

      if (response.status !== 201) {
        // Mostrar mensaje de error
      }
    } catch (error) {
      // Mostrar mensaje de error
      console.log("Error al enviar el like", error)
    }
  }

  return (
    <button
      className="w-fit rounded-md border border-red-950 px-2 py-1 text-red-600 transition-colors hover:bg-red-500 hover:text-black"
      onClick={handleLike}
    >
      Like {likesNumber}
    </button>
  )
}
