import { Grid } from '@/components/Grid'
import { useMe } from '@/hooks/useMe'
import type { ListOfGifs } from '@giffy/types'
import { useQuery } from '@tanstack/react-query'

export default function HomePage() {
	const { getSavedUserId } = useMe()
	const { data } = useQuery<ListOfGifs>({
		queryKey: ['likes', `${getSavedUserId()}`],
		queryFn: () => fetch(`api/likes/user/${getSavedUserId() ?? ''}`).then((res) => res.json()),
	})
	console.log(data)

	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<h2 className="text-5xl text-gradient font-medium">FAVORITE GIFS</h2>
			<Grid data={data} />
		</div>
	)
}
