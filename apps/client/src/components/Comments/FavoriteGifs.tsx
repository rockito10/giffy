import { useInfiniteLikedGifs } from '@/hooks/useInfiniteLikedGifs'
import { InfiniteGrid } from '../InfiniteGrid'

export function FavoriteGifs({ ...props }) {
	// const { userID } = props

	// const { data } = useQuery<ListOfGifs>({
	// 	queryKey: ['likes', `${userID}`],
	// 	queryFn: () => fetch(`api/likes/user/${userID}`).then((res) => res.json()),
	// })
	const { data, ref } = useInfiniteLikedGifs()
	return <InfiniteGrid data={data} ref={ref} />
}
