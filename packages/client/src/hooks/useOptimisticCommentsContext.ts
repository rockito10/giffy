import { OptimisticCommentsContext } from '@/contexts/OptimisticCommentsContext'
import { useContext } from 'react'

export function useOptimisticCommentsContext() {
	const { comments, addComment, removeComment, commentCount, setCommentCount } =
		useContext(OptimisticCommentsContext)
	return { comments, addComment, removeComment, commentCount, setCommentCount }
}
