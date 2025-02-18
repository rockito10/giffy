import { useMe } from '@/hooks/useMe'
import type { LikesResponse } from '@/types/response'
import { useState } from 'react'

interface Props extends React.HTMLProps<HTMLButtonElement> {
	gifId: string | undefined
	likesInfo: LikesResponse | null
}

export function LikeButton({ gifId, likesInfo, ...props }: Props) {
	if (!likesInfo) return //no sé por qué esto anda, si saco esto a veces no quiere funcionar el like (pone 0 cuando tiene que ser 1)

	const [likesNumber, setLikesNumber] = useState(likesInfo?.likesNumber ?? 0)

	const [isLiked, setIsLiked] = useState(likesInfo?.isLiked)

	const { id: userId } = useMe()

	// console.log(likesNumber, isLiked)

	function handleLike() {
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
				body: JSON.stringify({ userId }),
			})

			if (response.status === 201) {
				// Confirmamos que el comentario se ha enviado
			}

			if (response.status !== 201) {
				// Mostrar mensaje de error
			}
		} catch (error) {}
	}

	return (
		<button {...props} onClick={handleLike} type="button">
			{isLiked ? '👎' : '👍'} {likesNumber}
		</button>
	)
}
