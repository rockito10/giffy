import { FavoriteGifs } from '@/components/Comments/FavoriteGifs'
import { TrendingGifs } from '@/components/Comments/TrendingGifs'
import { useMe } from '@/hooks/useMe'

export default function HomePage() {
	const { getSavedUserId } = useMe()

	const userID = getSavedUserId()

	return (
		<div className="flex flex-col items-start gap-6">
			<h2 className="font-medium text-5xl text-gradient">
				{userID ? 'FAVORITE GIFS' : 'TRENDING GIFS'}
			</h2>

			<div className="home-container w-full">
				{<div className="home-box">{userID ? <FavoriteGifs /> : <TrendingGifs />}</div>}
			</div>

			{userID ? (
				<div>
					<h2 className="font-medium text-5xl text-gradient">{'TRENDING GIFS'}</h2>
					<div className="home-container w-full">
						{<div className="home-box"> {userID ? <TrendingGifs /> : <div />} </div>}
					</div>
				</div>
			) : (
				<div />
			)}
		</div>
	)
}
