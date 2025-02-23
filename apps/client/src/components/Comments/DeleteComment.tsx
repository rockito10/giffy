import { useCommentsContext } from '@/hooks/useCommentsContext'
import { useMe } from '@/hooks/useMe'
import { deleteComment } from '@/services/services'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface deleteCommentProps {
	gifId: string
	commentId: number
}

export function DeleteComment({ commentId, gifId }: deleteCommentProps) {
	const { getSavedUserId } = useMe()
	const userID = getSavedUserId()

	if (!userID) {
		return
	}

	const { removeComment } = useCommentsContext()

	const { mutate } = useMutation({
		mutationFn: deleteComment,
		onError: () => {
			toastError('There was an error while trying to delete the comment.')
		},
	})

	const handleDeleteComment = () => {
		mutate({ userId: userID, gifId, commentId })
		removeComment(commentId)
	}

	return (
		<button
			className="flex items-center justify-center rounded border bg-black px-2 py-1 transition-colors hover:bg-white hover:text-black"
			title="Delete comment"
			type="button"
			onClick={handleDeleteComment}
		>
			Remove
		</button>
	)
}

function toastError(message: string) {
	toast.error(message, {
		position: 'top-center',
		autoClose: 2000,
		progressClassName: 'bg-purple-500 text-purple-500',
		theme: 'dark',
	})
}
