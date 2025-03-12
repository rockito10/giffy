import { useInfiniteUploadedGifs } from '@/hooks/useInfiniteUploadedGifs'
import { InfiniteGrid } from './InfiniteGrid'

type UploadedGifsProps = {
	userID: string
}

export function UploadedGifs({ userID }: UploadedGifsProps) {
	const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteUploadedGifs({ userID })

	const handleMoreGifs = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}

	return (
		<div>
			<InfiniteGrid data={data} noResultsMessage="No gifs yet, start uploading!" />
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
