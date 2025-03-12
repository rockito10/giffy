import { useInfiniteLikedGifs } from '@/hooks/useInfiniteLikedGifs'
import { InfiniteGrid } from './InfiniteGrid'

type FavoriteGifsProps = {
	userID: string
}

export function FavoriteGifs({ userID }: FavoriteGifsProps) {
	const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteLikedGifs({ userID })
	const handleMoreGifs = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}

	return (
		<div>
			<InfiniteGrid
				data={data}
				noResultsMessage="No favorites yet, start liking your loved gifs!"
			/>
			<button
				type="button"
				className="rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700 "
				onClick={handleMoreGifs}
				disabled={isLoading}
			>
				Load more
			</button>
		</div>
	)
}
