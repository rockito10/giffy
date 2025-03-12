import { FavoriteGifs } from '@/components/FavoriteGifs'
import { UploadedGifs } from '@/components/UploadedGifs'
import { useMe } from '@/hooks/useMe'
import { getUser } from '@/services/services'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'wouter'

export default function UserGifsPage() {
	const { id: userID } = useParams()
	const { getSavedUserId } = useMe()
	const currentUserId = getSavedUserId()

	if (!userID) return <div>Cargando...</div>
	const { data } = useQuery({
		queryKey: [userID],
		queryFn: () => getUser(userID),
	})

	if (!data) return

	const { user_name: userOfPage } = data

	return (
		<div className="flex flex-col items-start gap-8">
			<h2 className="font-medium text-5xl text-gradient ">
				{currentUserId === userID ? 'MY GIFS' : `${userOfPage}'s GIFS`}
			</h2>

			<div className="home-container w-full ">
				<div className="home-box">
					<UploadedGifs userID={userID} />
				</div>
			</div>

			<h2 className="font-medium text-5xl text-gradient ">FAVORITE GIFS</h2>

			<div className="home-container w-full ">
				<div className="home-box">
					<FavoriteGifs userID={userID} />
				</div>
			</div>
		</div>
	)
}
