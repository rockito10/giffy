import { Avatar } from '@/components/Avatar'
import { CommentContainer } from '@/components/Comments/CommentContainer'
import { LikeButton } from '@/components/LikeButton'
import { CommentsContextProvider } from '@/contexts/CommentsContext'
import { useGetGifById } from '@/hooks/useGetGifById'
import { useMe } from '@/hooks/useMe'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useLocation, useParams } from 'wouter'

export default function GifsDetails() {
	const { id: gifId } = useParams()
	const [_, setLocation] = useLocation()
	const { getSavedUserId } = useMe()
	const { data, isLoading, error } = useGetGifById(gifId as string, getSavedUserId() ?? '')

	if (error) {
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(() => {
			toastError('Unexpected error has occurred.')
		}, [error])

		return (
			<div>
				<ToastContainer />
				{error.name} {error.message}
			</div>
		)
	}

	if (isLoading) return <div>Loading...</div>

	const { authorData, likesData, gifData } = data

	if (!gifData || !gifData?.id) {
		setLocation('/404')
		return null
	}

	const { alt, description, images, title, authorName, tags } = gifData

	return (
		<div>
			<ToastContainer />
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
								{/* {authorId && authorData?.avatar && ( */}
								<Avatar nameless={true} name={authorName} src={authorData?.avatar} />
								{/* )} */}
								{<h2 className="text-xl">{authorName || 'Anonymous'}</h2>}
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
							<div className="flex gap-4">
								<button
									className="share-button url-button"
									type="button"
									onClick={() =>
										navigator.clipboard
											.writeText(images?.gif)
											.then(() => toastSuccess('URL copied!'))
									}
								>
									<img
										src="https://tenor.com/assets/img/icons/link.svg"
										alt="Share URL"
										className="url-icon"
									/>
								</button>
								<a
									className="share-button twitter-button"
									href={`https://twitter.com/intent/tweet?text=I%20love%20this%20GIF!&url=${images?.gif}`}
									data-size="large"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="https://tenor.com/assets/img/icons/twitter.svg"
										alt="Twitter"
										className="twitter-icon"
									/>
								</a>
							</div>
							<CommentContainer />
						</section>
					</div>
				</div>
			</CommentsContextProvider>
		</div>
	)
}
function toastError(message: string) {
	toast.error(message, {
		position: 'top-center',
		autoClose: 2000,
		progressClassName: 'bg-purple-500 text-purple-500',
		theme: 'dark',
	})
}

function toastSuccess(message: string) {
	toast.success(message, {
		position: 'top-center',
		autoClose: 2000,
		progressClassName: 'bg-purple-500 text-purple-500',
		theme: 'dark',
	})
}
