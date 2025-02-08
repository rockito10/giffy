import { Avatar } from '@/components/Avatar'
import { useMe } from '@/hooks/useMe'
import { useParams } from 'wouter'
import { DeleteComment } from './DeleteComment'

interface Props {
	username: string
	avatar: string
	comment: string
	commentId: number
	userId: string
}

export function CommentComponent({ username, avatar, comment, commentId, userId }: Props) {
	const { id: gifId } = useParams()
	const { id: currentUserId } = useMe()

	return (
		<li className="relative flex w-2/3 items-center border border-white/70">
			<div className="flex w-full items-center gap-4">
				{/* ... */}

				<div className="flex flex-col items-center border-white/50 border-r p-[1vw]">
					<Avatar name={username} src={avatar} />
					<h3 className="font-bold text-sm">{username} </h3>
				</div>

				{/* ... */}

				<span>{comment}</span>
			</div>
			<span className="-bottom-4 -right-4 absolute z-10">
				{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
				{currentUserId === userId && <DeleteComment commentId={commentId} gifId={gifId!} />}
			</span>
		</li>
	)
}
