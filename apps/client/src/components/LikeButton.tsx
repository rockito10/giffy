import { useMe } from '@/hooks/useMe'
import type { LikesResponse } from '@/types/response'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface Props extends React.HTMLProps<HTMLButtonElement> {
	gifId: string | undefined
	likesInfo: LikesResponse | null
}

export function LikeButton({ gifId, likesInfo, ...props }: Props) {
	if (!likesInfo) return //no sé por qué esto anda, si saco esto a veces no quiere funcionar el like (pone 0 cuando tiene que ser 1)

	const [likesNumber, setLikesNumber] = useState(likesInfo?.likesNumber ?? 0)

	const [isLiked, setIsLiked] = useState(likesInfo?.isLiked)

	const { getSavedUserId } = useMe()
	const userID = getSavedUserId()

	function handleLike() {
		if (!userID) {
			toastError('You must be logged in to like a gif.')
			return
		}	
		if (isLiked) {
			setLikesNumber(likesNumber - 1)
			setIsLiked(false)
		} else {
			setLikesNumber(likesNumber + 1)
			setIsLiked(true)
		}

		postLike()
	}

	async function postLike() {
		try {
			const response = await fetch(`/api/likes/${gifId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userID }),
			})

			if (response.status !== 202) {
				toastError('There was an error while trying to like the gif.')
			}
		} catch (error) {
			toastError('Unexpected error has occurred')
			console.log(error)
		}
	}

	return (
		<button {...props} onClick={handleLike} type="button">
			{isLiked ? '👎' : '👍'} {likesNumber}
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
