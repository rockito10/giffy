import { Link } from 'wouter'

interface Props {
	alt: string
	id: string
	src: string
	className?: string
}

export function Frame({ alt, id, src, className }: Props) {
	return (
		// <Link key={id} href={`/gif/${id}`} className='group relative hover:z-10'>
		// 	<img
		// 		alt={alt}
		// 		className={`${className} w-full rounded-md transition-transform hover:scale-125`}
		// 		src={src}
		// 	/>

		// 	<button
		// 		className='share-button url-button absolute top-4 right-2 w-full opacity-0 transition-opacity group-hover:opacity-100'
		// 		type="button"
		// 		onClick={() => navigator.clipboard.writeText(src)}
		// 	>
		// 		<img
		// 			src="https://tenor.com/assets/img/icons/link.svg"
		// 			alt="Share URL"
		// 			className="url-icon"
		// 		/>
		// 	</button>
		// </Link>
		<Link key={id} to={`/gif/${id}`}>
			<img
				alt={alt}
				className={`${className} rounded-md transition-transform hover:scale-110`}
				src={src}
			/>
		</Link>
	)
}

/*
interface Props {
	alt: string
	id: string
	src: string
	className?: string
}

export function Frame({ alt, id, src, className }: Props) {
	return (
		<Link key={id} href={`/gif/${id}`}>
			<img
				alt={alt}
				className={`${className} rounded-md transition-transform hover:scale-110`}
				src={src}
			/>
		</Link>
	)
}
*/
