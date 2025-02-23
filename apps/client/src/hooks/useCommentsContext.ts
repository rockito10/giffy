import { CommentsContext } from '@/contexts/CommentsContext'
import { useContext } from 'react'

export function useCommentsContext() {
	const { comments, addComment, setComments, nextCommentId, setNextCommentId, removeComment } =
		useContext(CommentsContext)

	return { comments, addComment, setComments, nextCommentId, setNextCommentId, removeComment }
}
