import { useCommentsContext } from '@/hooks/useCommentsContext'
import { useMe } from '@/hooks/useMe'
import { deleteComment } from '@/services/services'
import { useMutation } from '@tanstack/react-query'

interface deleteCommentProps {
	gifId: string
	commentId: number
}

export function DeleteComment({ commentId, gifId }: deleteCommentProps) {
	const { id: userId } = useMe()
  if(!userId) return null

	const { removeComment } = useCommentsContext()

	const { mutate } = useMutation({
		mutationFn: deleteComment,
	})

  const handleDeleteComment = () => {
    mutate({ userId, gifId, commentId })
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
