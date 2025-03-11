import { Avatar } from '@/components/Avatar'
import { useMe } from '@/hooks/useMe'
import { useParams } from 'wouter'
import { DeleteComment } from './DeleteComment'

interface CommentComponentProps {
	username: string
	avatar: string
	comment: string
	commentId: number
	userId: string
}

export function CommentComponent({
	username,
	avatar,
	comment,
	commentId,
	userId,
}: CommentComponentProps) {
	const { id: gifId } = useParams()
	const { getSavedUserId } = useMe()
	const currentUserId = getSavedUserId()

	return (
		<li className="relative flex items-center rounded-md bg-[#28242f] p-2 text-white">
			<div className="flex w-full items-center gap-4">
				{/* ... */}

				<div className="z-50 flex flex-col items-center gap-2 border-gray-500 border-r p-[1vw]">
					<Avatar name={username} src={avatar} className="size-20" />
					<h3 className="text-sm">{username} </h3>
				</div>

				{/* ... */}

				<span className="w-1/2 break-words md:w-4/5">{comment}</span>
			</div>
			<span className="-bottom-4 -right-4 absolute z-10">
				{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
				{currentUserId === userId && <DeleteComment commentId={commentId} gifId={gifId!} />}
			</span>
		</li>
	)
}
