import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
	name?: string | null | undefined
	src: string | null | undefined
	usernameClasses?: string
}

export function Avatar({ name, src, usernameClasses, ...props }: Props) {
	return (
		<div {...props}>
			<img
				alt={`Avatar of ${name ?? 'Guest'}`}
				className="aspect-square rounded-full object-cover"
				src={src || '/assets/no-avatar.svg'}
				loading="lazy"
			/>
		</div>
	)
}
