import { useParams } from "wouter"

interface Props {
  isFirstComment: boolean
}

export function NewComment({ isFirstComment }: Props) {
  const { id } = useParams()

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    // Post Comment
    const comment = evt.currentTarget.querySelector("textarea")?.value
    if (!comment) return

    const infoToSend = {
      comment,
      comment_num: 21,
      username: "peparda",
    }

    // ACTUALIZACION OPTIMISTA (Add comment to UI)

    try {
      const response = await fetch(`http://localhost:3000/comments/${id}`, {
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
    // const textarea = evt.currentTarget.querySelector("textarea")
    // if (textarea) textarea.value = ""
  }

  return (
    <form onSubmit={handleSubmit}>
      {isFirstComment ? (
        <p className="w-fit bg-red-600 px-2 py-1">No comments yet. Be the first to comment!</p>
      ) : (
        <p className="w-fit bg-red-600 px-2 py-1">Add a comment</p>
      )}
      <textarea className="h-16 w-2/3 p-2 text-black" placeholder="Your comment here!"></textarea>
      <button>Enviar</button>
    </form>
  )
}
