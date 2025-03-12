import { toast } from 'react-toastify'
import { Link } from 'wouter'
import { downloadGif } from '../utils/downloadGif'
import { CopyImage } from './icons/CopyImage'
import { DownloadIcon } from './icons/DownloadIcon'

interface Props {
	alt: string
	id: string
	src: string
	className?: string
	title: string
}

export function Frame({ title, alt, id, src }: Props) {
	const handleDownload = () => {
		downloadGif({
			filename: `${title || alt}.gif`,
			url: src,
		})
		toast.success('Gif downloaded!')
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(src)
		toast.success('Link copied!')
	}

	return (
		<div className="group relative overflow-hidden rounded-md transition-transform hover:scale-110">
			<Link key={id} to={`/gif/${id}`}>
				<img alt={alt} src={src} loading="lazy" />
			</Link>
			<div className="absolute top-1 right-1 z-[100] flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
				<button
					className="flex size-10 items-center justify-center rounded-full bg-black/80 text-white"
					type="button"
					onClick={handleCopy}
				>
					<CopyImage />
				</button>
				<button
					type="button"
					className="flex size-10 items-center justify-center rounded-full bg-black/80"
					onClick={handleDownload}
				>
					<DownloadIcon />
				</button>
			</div>
		</div>
	)
}
