import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { CommentContainer } from '@/components/Comments/CommentContainer'
import { LikeButton } from '@/components/LikeButton'
import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { CommentsContextProvider } from '@/contexts/CommentsContext'
import { useGetGifById } from '@/hooks/useGetGifById'
import { useMe } from '@/hooks/useMe'
import { downloadGif } from '@/utils/downloadGif'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useLocation, useParams } from 'wouter'

export default function GifsDetails() {
	const { id: gifId } = useParams()
	const [_, setLocation] = useLocation()
	const { getSavedUserId } = useMe()
	const { data, isLoading, error } = useGetGifById(gifId as string, getSavedUserId() ?? '')

	if (error) {
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(() => {
			toast.error('Unexpected error has occurred.')
		}, [error])

		return (
			<div>
				{error.name} {error.message}
			</div>
		)
	}

	if (isLoading) return <div>Loading...</div>

	const { likesData, gifData } = data

	if (!gifData || !gifData?.id) {
		setLocation('/404')
		return null
	}

	const { alt, description, images, title, tags, authorData } = gifData

	const { authorAvatar, authorName, authorId } = authorData

	const src = images?.gif

	const handleDownload = () => {
		downloadGif({
			filename: `${title || alt}.gif`,
			url: src,
		}).then(() => {
			toast.success('Gif downloaded!')
		})
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(images?.gif).then(() => toast.success('URL copied!'))
	}

	const LinkAvatar = authorId ? (
		<Link to={`/user/${authorId}`}>
			<Avatar
				usernameClasses="hidden"
				name={authorName}
				src={authorAvatar}
				className="size-16 md:scale-100"
			/>
		</Link>
	) : (
		<Avatar
			usernameClasses="hidden"
			name={authorName}
			src={authorAvatar}
			className="size-10 md:scale-100"
		/>
	)

	return (
		<div>
			<CommentsContextProvider>
				<div className="flex flex-col gap-8 md:flex-row">
					{/* <div className="flex flex-col gap-8 "> */}
					{/* --- GIF DESKTOP --- */}
					<div className="hidden min-w-[25%] max-w-[50%] flex-shrink-0 flex-col gap-y-4 md:flex ">
						<img alt="gif" className="w-full rounded-2xl border-4 border-[#28242f]" src={src} />
					</div>

					<section className="flex w-full flex-col gap-4 md:w-2/3">
						{/* --- TITLE --- */}
						<h1 className="font-medium text-lg md:text-3xl">{title || alt}</h1>

						{/* --- GIF MOBILE --- */}
						<div className="block w-full flex-shrink-0 flex-col gap-y-4 md:hidden md:w-1/3 ">
							<img alt="gif" className="w-full rounded-2xl border-4 border-[#28242f]" src={src} />
						</div>
						<div className="flex flex-row items-center gap-3">
							{LinkAvatar}
							{<h2 className="md:text-xl">{authorName || 'Anonymous'}</h2>}
						</div>

						{description && <p>{description}</p>}

						{/* --- TAGS --- */}
						<div className="flex flex-wrap gap-2">
							{tags?.map((tag) => (
								<Link
									key={tag}
									className="rounded-full border-2 border-[#28242f] px-4 py-1 text-sm transition-all hover:scale-110 hover:bg-[#28242f] hover:text-white"
									to={`/search/${tag}`}
									onClick={() => {
										;(document.getElementById('searchbar') as HTMLInputElement).value = tag
									}}
								>
									{tag}
								</Link>
							))}
						</div>

						{/* --- --- --- Buttons (START) --- --- --- */}

						<div className="flex items-center gap-4">
							<LikeButton
								gifId={gifId}
								likesInfo={likesData}
								className="size-12 rounded-full bg-[#28242f]"
							/>

							<div className="flex gap-4">
								{/* SHARE BUTTON */}
								<Button onClick={handleCopy}>
									<img
										src="https://tenor.com/assets/img/icons/link.svg"
										alt="Share URL"
										className="size-12"
									/>
								</Button>

								{/* DOWNLOAD */}

								<button
									onClick={handleDownload}
									type="button"
									className="flex size-12 items-center justify-center rounded-full bg-[#28242f] p-2"
								>
									<DownloadIcon />
								</button>

								{/* TWITTER BUTTON */}

								<Button
									href={`https://twitter.com/intent/tweet?text=I%20love%20this%20GIF!&url=${images?.gif}`}
								>
									<img
										src="https://tenor.com/assets/img/icons/twitter.svg"
										alt="Twitter"
										className="size-12"
									/>
								</Button>
							</div>
						</div>

						{/* --- --- --- Buttons (END) --- --- --- */}

						<div className="w-[90%] md:w-[70%] md:max-w-full">
							<CommentContainer />
						</div>
					</section>
					{/* </div> */}
				</div>
			</CommentsContextProvider>
		</div>
	)
}
