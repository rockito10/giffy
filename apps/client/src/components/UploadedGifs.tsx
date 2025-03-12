import { useInfiniteUploadedGifs } from '@/hooks/useInfiniteUploadedGifs'
import { InfiniteGrid } from './InfiniteGrid'

type UploadedGifsProps = {
	userID: string
}

export function UploadedGifs({ userID }: UploadedGifsProps) {
	const { data, ref } = useInfiniteUploadedGifs({ userID })
	return <InfiniteGrid data={data} ref={ref} noResultsMessage="No gifs yet, start uploading!" />
}
