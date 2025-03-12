import { useCommentsContext } from '@/hooks/useCommentsContext'
import { useMe } from '@/hooks/useMe'
import { postComment } from '@/services/services'
import type { Comment } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'wouter'

export function NewComment() {
	const { id: gifId }: { id: string } = useParams()

	const { addComment, nextCommentId } = useCommentsContext()
	const { avatar, getUserName, getSavedUserId } = useMe()
	const username = getUserName()
	const userId = getSavedUserId()

	const { mutate } = useMutation({
		mutationFn: postComment,
	})

	// Post Comment

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()

		if (!userId) {
			toast.error('You must be logged in to comment.')
			return
		}

		const textarea = textareaRef.current

		// Comprobaciones
		if (!textarea || !avatar || !username || !userId)
			return toast.error('An unexpected error has ocurred.')

		const commentText = textarea.value

		if (!commentText.trim()) return

		// Crear comentario
		const comment: Comment = {
			avatar,
			comment_id: nextCommentId,
			text: commentText,
			gif_id: gifId,
			user_name: username,
			user_id: userId,
		}

		//añadir comentario a la base de datos y a comment section
		mutate({ commentText, userId, gifId })
		addComment(comment)

		// Limpiar textarea
		textarea.value = ''
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col items-start gap-4">
				<textarea
					ref={textareaRef}
					className="box-border h-16 w-full max-w-[40ch] resize-none break-words rounded-lg border-2 border-b bg-[#28242f] px-4 py-2 text-white focus:outline-none md:max-w-[80ch]"
					maxLength={100}
					placeholder="Your comment here!"
					onKeyDown={(evt) => {
						if (evt.key === 'Enter' && !evt.shiftKey) {
							const form = evt.currentTarget.closest('form') // Obtener el formulario
							evt.preventDefault() // Evitar que se haga un salto de línea
							if (form) {
								form.requestSubmit() // Enviar el formulario
							}
						}
					}}
				/>
				<button
					className="rounded-md border px-3 py-2 transition-colors hover:bg-white hover:text-black"
					type="submit"
				>
					Comment
				</button>
			</div>
		</form>
	)
}

 