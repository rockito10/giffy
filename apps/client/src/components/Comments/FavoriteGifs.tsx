import { useInfiniteLikedGifs } from '@/hooks/useInfiniteLikedGifs'
import { InfiniteGrid } from '../InfiniteGrid'

export function FavoriteGifs() {
	const { data, ref } = useInfiniteLikedGifs()
	return (
		<InfiniteGrid
			data={data}
			ref={ref}
			noResultsMessage="No favorites yet, start liking your loved gifs!"
		/>
	)
}
