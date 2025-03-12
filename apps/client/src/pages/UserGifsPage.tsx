import { FavoriteGifs } from '@/components/FavoriteGifs'
import { UploadedGifs } from '@/components/UploadedGifs'
import { useParams } from 'wouter'

export default function UserGifsPage() {
	const { id } = useParams()

	if (!id) return <div>Cargando...</div>

	return (
		<div className="flex flex-col items-start gap-8">
			<h2 className="font-medium text-5xl text-gradient ">MY GIFS</h2>

			<div className="home-container w-full ">
				<div className="home-box">
					<UploadedGifs userID={id} />
				</div>
			</div>

			<h2 className="font-medium text-5xl text-gradient ">FAVORITE GIFS</h2>

			<div className="home-container w-full ">
				<div className="home-box">
					<FavoriteGifs userID={id} />
				</div>
			</div>
		</div>
	)
}
