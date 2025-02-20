import type { ListOfGifs } from '@giffy/types'
import { useQuery } from '@tanstack/react-query'
import { Grid } from '../Grid'

export function FavoriteGifs({ ...props }) {
	const { userID } = props

	const { data } = useQuery<ListOfGifs>({
		queryKey: ['likes', `${userID}`],
		queryFn: () => fetch(`api/likes/user/${userID}`).then((res) => res.json()),
	})
	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<Grid data={data} />
		</div>
	)
}
