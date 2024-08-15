import { useState } from "react"
import { useParams } from "wouter"
import { useFetch } from "../hooks/useFetch"

interface Props {
  gifId: string | undefined
}

export function LikeButton({ gifId }: Props) {
  const { data: likes, isLoading, error } = useFetch<number>(`/api/likes/${gifId}`)

  // const [nroLikes, setLikes] = useState(() => {
  //   return nroLikes ? parseInt(nroLikes) : 0
  // })

  // const {id} = useParams()

  const [isLiked, setIsLiked] = useState(false)

  function handleLike() {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
    postLike()
  }

  async function postLike() {
    try {
      const response = await fetch(`/api/likes/${gifId}`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // }
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
      Like {!likes ? 0 : likes}
    </button>
  )
}
