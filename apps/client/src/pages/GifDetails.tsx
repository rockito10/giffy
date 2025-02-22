import { Avatar } from '@/components/Avatar'
import { CommentContainer } from '@/components/Comments/CommentContainer'
import { LikeButton } from '@/components/LikeButton'
import { CommentsContextProvider } from '@/contexts/CommentsContext'
import { useGetGifById } from '@/hooks/useGetGifById'
import { useMe } from '@/hooks/useMe'
import { Link, useLocation, useParams } from 'wouter'

export default function GifsDetails() {
	const { id: gifId } = useParams()
	const [_, setLocation] = useLocation()
	const { getSavedUserId } = useMe()
	console.log(getSavedUserId())
	const { data, isLoading, error } = useGetGifById(gifId as string, getSavedUserId() ?? "")

	if (error)
		return (
			<div>
				{error.name} {error.message}
			</div>
		)

	if (isLoading) return <div>Loading...</div>

	const { authorData, likesData, gifData } = data

	if (!gifData || !gifData?.id) {
		setLocation('/404')
		return null
	}

	const { alt, description, images, title, authorId, authorName, tags } = gifData

	return (
		<CommentsContextProvider>
			<div className="flex flex-col gap-8">
				<div className="flex gap-8">
					{/* --- GIF --- */}
					<div className="flex w-1/3 flex-shrink-0 flex-col gap-y-4">
						<img
							alt="gif"
							className="w-full rounded-2xl border-4 border-[#28242f]"
							src={`${images?.gif}`}
						/>
					</div>

					<section className="mt-8 flex w-2/3 min-w-2/3 flex-col justify-start gap-[1vw]">
						{/* --- TITLE --- */}
						<h1 className="text-3xl">{title || alt}</h1>
						<div className="flex flex-row items-center gap-2">
							{authorId && authorData?.avatar && (
								<Avatar name={authorName} src={authorData?.avatar} />
							)}
							{authorName && <h2 className="text-xl">{authorName}</h2>}
						</div>

						{description && <p>{description}</p>}

						{/* --- TAGS --- */}
						<div className="flex flex-wrap gap-[0.5vw]">
							{tags?.map((tag) => (
								<Link
									key={tag}
									className="rounded-full border-2 border-[#28242f] px-4 py-1 transition-all hover:scale-110 hover:bg-[#28242f] hover:text-white"
									to={`/search/${tag}`}
									onClick={() => {
										;(document.getElementById('searchbar') as HTMLInputElement).value = tag
									}}
								>
									{tag}
								</Link>
							))}
						</div>

						{/* LIKES */}

						<div className="flex gap-4 [&>button]:flex [&>button]:size-1 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-xl [&>button]:border-2 [&>button]:border-[#28242f] [&>button]:p-7 [&>button]:text-center [&>button]:transition-colors [&>button]:hover:text-white">
							<LikeButton gifId={gifId} likesInfo={likesData} className={'bg-[#28242f]'} />
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
