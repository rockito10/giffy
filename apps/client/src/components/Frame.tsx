import { Link } from 'wouter'

interface Props {
	alt: string
	id: string
	src: string
	className?: string
}

export function Frame({ alt, id, src, className }: Props) {
	return (
		<Link key={id} href={`/gif/${id}`} className="relative hover:z-10 group">
			<img
				alt={alt}
				className={`${className} rounded-md transition-transform hover:scale-125`}
				src={src}
			/>

			<button
				className="share-button url-button absolute top-4 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
				type="button"
				onClick={() => navigator.clipboard.writeText(src)}
			>
				<img
					src="https://tenor.com/assets/img/icons/link.svg"
					alt="Share URL"
					className="url-icon"
				/>
			</button>
		</Link>
	)
}
