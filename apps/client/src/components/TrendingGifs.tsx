import { useInfiniteTrending } from '@/hooks/useInfiniteTrending'
import { InfiniteGrid } from './InfiniteGrid'

export function TrendingGifs() {
	const { data, ref } = useInfiniteTrending()
	return <InfiniteGrid data={data} ref={ref} />
}
