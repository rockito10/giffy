import { Link } from 'wouter'
import { DownloadIcon } from './icons/DownloadIcon'
import { CopyImage } from './icons/CopyImage'
import { downloadGif } from '../utils/downloadGif'
import { toast } from 'react-toastify'

interface Props {
	alt: string
	id: string
	src: string
	className?: string
	title: string
}

export function Frame({ title, alt, id, src, className }: Props) {
	const handleDownload = (e: React.MouseEvent) => {
		downloadGif({
			filename: `${title || alt}.gif`,
			url: src,
		})
		toast.success('Gif downloaded!')
	}

	const handleCopy = (e: React.MouseEvent) => {
		navigator.clipboard.writeText(src)
		toast.success('Link copied!')
	}

	return (
		<div className="relative group hover:scale-110 transition-transform rounded-md overflow-hidden">
			<Link key={id} to={`/gif/${id}`}>
				<img alt={alt} src={src} loading="lazy" />
			</Link>
			<div className="absolute top-1 right-1 z-[100] opacity-0 transition-opacity group-hover:opacity-100 flex flex-col gap-2">
				<button
					className="size-10 bg-black/80 rounded-full flex items-center justify-center text-white"
					type="button"
					onClick={handleCopy}
				>
					<CopyImage />
				</button>
				<button
					type="button"
					className="size-10 bg-black/80 rounded-full flex items-center justify-center"
					onClick={handleDownload}
				>
					<DownloadIcon />
				</button>
			</div>
		</div>
	)
}
