import { UploadedGifs } from '@/components/UploadedGifs'

export default function UploadedGifsPage() {
	// const { getSavedUserId } = useMe()

	return (
		<div className="flex flex-col items-start gap-8">
			<h2 className="font-medium text-5xl text-gradient ">MY GIFS</h2>

			<div className="home-container w-full ">
				<div className="home-box">
					<UploadedGifs />
				</div>
			</div>
		</div>
	)
}
