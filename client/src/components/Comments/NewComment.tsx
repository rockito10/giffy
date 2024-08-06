import { useParams } from "wouter"
import { useMe } from "../../hooks/useMe"
import { useOptimisticCommentsContext } from "../../hooks/useOptimisticCommentsContext"

interface Props {
  isFirstComment: boolean
}

export function NewComment({ isFirstComment }: Props) {
  const { id } = useParams()
  const { addComment } = useOptimisticCommentsContext()
  const { avatar, username } = useMe()

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    // Post Comment
    const commentText = evt.currentTarget.querySelector("textarea")?.value
    if (!commentText) return

    const infoToSend = {
      commentText,
      username,
      // ID DE PEPE
      // IDE DEL COMENTARIO
    }

    // ACTUALIZACION OPTIMISTA (Add comment to UI)

    const optCom = {
      avatar,
      comment_num: -1,
      comment: commentText,
      gif_id: id,
      username,
    }

    addComment(optCom)

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoToSend),
      })

      console.log({ response })

      if (response.status === 201) {
        // Confirmamos que el comentario se ha enviado
      }

      if (response.status !== 201) {
        // Mostrar mensaje de error
      }
    } catch (error) {
      // Mostrar mensaje de error
      console.log("Error al enviar el comentario", error)
    }

    // Clear textarea
    const textarea = evt.currentTarget.querySelector("textarea")
    if (textarea) textarea.value = ""
  }

  return (
    <form onSubmit={handleSubmit}>
      {isFirstComment ? (
        <p className="w-fit px-2 py-1">No comments yet. Be the first to comment!</p>
      ) : (
        <p className="w-fit px-2 py-1">Add a comment</p>
      )}
      <div className="flex w-2/3 flex-col items-start gap-4">
        <textarea
          className="h-16 w-full resize-none rounded-lg border border-white/70 bg-black p-2 text-white"
          placeholder="Your comment here!"
        />
        <button className="rounded-xl border px-3 py-2 transition-colors hover:bg-white hover:text-black">
          Comment
        </button>
      </div>
    </form>
  )
}
