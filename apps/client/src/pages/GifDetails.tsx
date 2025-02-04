import { CommentContainer } from '@/components/Comments/CommentContainer'
import { CommentsContextProvider } from '@/contexts/CommentsContext'
import { useGetGifById } from '@/hooks/useGetGifById'
import { Link, useParams } from 'wouter'

export default function GifsDetails() {
	const { id: gifId } = useParams()
	const { data, isLoading, error } = useGetGifById(gifId as string)

	// console.log(data)

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
						<img
							alt="gif"
							className="w-full rounded-2xl border-4 border-[#28242f]"
							src={`${data?.images?.gif}`}
						/>
					</div>

					<section className="mt-8 flex w-2/3 min-w-2/3 flex-col justify-start gap-[1vw]">
						{/* --- TITLE --- */}
						<h1 className="text-2xl">{data.title || data.alt}</h1>

						{/* --- TAGS --- */}
						<div className="flex flex-wrap gap-[0.5vw]">
							{data?.tags?.map((tag) => (
								<Link
									key={tag}
									className="rounded-full border-2 border-[#28242f] px-4 py-1 transition-all hover:scale-110 hover:bg-[#28242f] hover:text-white"
									to={`/search/${tag}`}
								>
									{tag}
								</Link>
							))}
						</div>

						{/* LIKES */}

						<div className="flex gap-4 [&>button]:flex [&>button]:size-1 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border-2 [&>button]:border-[#28242f] [&>button]:p-7 [&>button]:text-center [&>button]:transition-colors [&>button]:hover:text-white">
							<button type="button" className="hover:bg-green-500">
								👍 25
							</button>
							<button type="button" className="hover:bg-red-500">
								👎 13
							</button>
						</div>

						{/* --- SHARE --- */}
						<span>Facebook | Twitter | Instagram</span>
						<CommentContainer />
					</section>
				</div>
			</div>
		</CommentsContextProvider>
	)
}
