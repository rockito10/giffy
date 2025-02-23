import { useInfiniteTrending } from '@/hooks/useInfiniteTrending'
import { InfiniteGrid } from '../InfiniteGrid'

export function TrendingGifs({ ...props }) {
	// const { userID } = props
	// const { data } = useQuery<ListOfGifs>({
	// 	queryKey: ['likes', `${userID}`],
	// 	queryFn: () => fetch('api/trending').then((res) => res.json()),
	// })
	const { data, ref } = useInfiniteTrending()
	return (
			<InfiniteGrid data={data} ref={ref} />
	)
}
