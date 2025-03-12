import { useInfiniteLikedGifs } from '@/hooks/useInfiniteLikedGifs'
import { InfiniteGrid } from './InfiniteGrid'

type FavoriteGifsProps = {
	userID: string
}

export function FavoriteGifs({ userID }: FavoriteGifsProps) {
	const { data, ref } = useInfiniteLikedGifs({ userID })
	return (
		<InfiniteGrid
			data={data}
			ref={ref}
			noResultsMessage="No favorites yet, start liking your loved gifs!"
		/>
	)
}
