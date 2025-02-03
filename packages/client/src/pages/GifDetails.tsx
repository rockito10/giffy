import { CommentContainer } from '@/components/Comments/CommentContainer'
import { CommentsContextProvider } from '@/contexts/CommentsContext'
import { useGetGifById } from '@/hooks/useGetGifById'
import { Link, useParams } from 'wouter'

export default function GifsDetails() {
	const { id: gifId } = useParams()
	const { data, isLoading, error } = useGetGifById(gifId as string)

	if (error)
		return (
			<div>
				{error.name} {error.message}
			</div>
		)

	if (isLoading) return <div>Loading...</div>

	if (!data) return <div>No data</div>

	return (
		<CommentsContextProvider>
			<div className="flex flex-col gap-8">
				<div className="flex gap-8">
					{/* --- GIF --- */}
					<div className="flex w-1/3 flex-shrink-0 flex-col gap-y-4">
						<h1 className="text-4xl">Your GIF: {data.alt}</h1>
						<img
							alt="gif"
							className="w-full rounded-md border-4 border-double"
							src={`${data?.images?.gif}`}
						/>
					</div>

					<section className="flex flex-col justify-center gap-8">
						{/* --- TAGS --- */}
							<span className='text-3xl text-green-500'>TAGS: </span>
						<div className="flex items-center flex-wrap gap-x-3 gap-y-4">

							{data?.tags?.map((tag) => (
								<Link
									key={tag}
									className="rounded-full px-4 py-2 transition-colors border hover:bg-white hover:text-black transitions-colors"
									to={`/search/${tag}`}
								>
									{tag}
								</Link>
							))}
						</div>

						<span>Share: Facebook | Twitter | Instagram</span>

						{/* <LikeButton gifId={id} likesInfo={likesInfo} /> */}
					</section>

					{/*  */}
				</div>

				{/* ... */}

				<div>
					<CommentContainer />
				</div>
			</div>
		</CommentsContextProvider>
	)
}
