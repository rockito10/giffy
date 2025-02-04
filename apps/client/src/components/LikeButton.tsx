import { useMe } from '@/hooks/useMe'
import type { LikesResponse } from '@/types/response'
import { useState } from 'react'

interface Props {
	gifId: string | undefined
	likesInfo: LikesResponse | null
}

export function LikeButton({ gifId, likesInfo }: Props) {
	// const { likesNumber: initialLikes, isLiked: isLikedDB } = likesInfo

	const [likesNumber, setLikesNumber] = useState(likesInfo?.likesNumber ?? 0)

	const [isLiked, setIsLiked] = useState(likesInfo?.isLiked)

	const { id: userId } = useMe()

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
		} catch (error) {
			// Mostrar mensaje de error
			console.log('Error al enviar el like', error)
		}
	}

	return (
		<button
			className="w-fit rounded-md border border-red-950 px-2 py-1 text-red-600 transition-colors hover:bg-red-500 hover:text-black"
			onClick={handleLike}
			type="button"
		>
			{isLiked ? 'Unlike' : 'Like'} {likesNumber}
		</button>
	)
}
