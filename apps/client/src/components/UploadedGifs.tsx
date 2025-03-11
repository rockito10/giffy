import { useInfiniteUploadedGifs } from '@/hooks/useInfiniteUploadedGifs'
import { InfiniteGrid } from './InfiniteGrid'

export function UploadedGifs() {
	const { data, ref } = useInfiniteUploadedGifs()
	return <InfiniteGrid data={data} ref={ref} noResultsMessage="No gifs yet, start uploading!" />
}
