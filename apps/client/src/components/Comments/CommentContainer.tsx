import { Comments } from './Comments'
import { NewComment } from './NewComment'

export function CommentContainer() {
	return (
		<section className="space-y-6">
			<NewComment />
			<hr className="border border-gray-500" />
			<Comments />
		</section>
	)
}
