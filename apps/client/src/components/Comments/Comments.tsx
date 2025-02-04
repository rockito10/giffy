import { useCommentsContext } from '@/hooks/useCommentsContext'
import { fetchComments } from '@/services/services'
import type { CommentResponse } from '@giffy/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'wouter'
import { CommentComponent } from './CommentComponent'

export function Comments() {
	const { id } = useParams()

	if (!id) return null

	const { data } = useQuery<CommentResponse>({
		queryKey: ['comments', id],
		queryFn: () => fetchComments(id),
	})

	const { comments, setComments, setNextCommentId } = useCommentsContext()

	useEffect(() => {
		if (!data) {
			return
		}
		const { mappedComments, nextCommentId } = data

		setComments(mappedComments)
		setNextCommentId(nextCommentId)
	}, [data])

	return (
		<ul className="space-y-8">
			{comments?.map(({ comment_id, user_name, avatar, text, user_id }) => (
				<div key={comment_id}>
					<CommentComponent
						avatar={avatar}
						comment={text}
						commentId={comment_id}
						userId={user_id}
						username={user_name}
					/>
				</div>
			))}
		</ul>
	)
}
