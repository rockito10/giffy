import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
	name?: string | null | undefined
	src: string | null | undefined
	usernameClasses?: string
}

export function Avatar({ name, src, usernameClasses, ...props }: Props) {
	return (
		<div {...props}>
			{/* <div className="relative flex items-center justify-center gap-2">
				<div className={usernameClasses}>
					<span className="-bottom-6 absolute rounded-md bg-[#28242f] px-4 py-1">
						{name || 'Guest'}
					</span>
				</div> */}

				<img
					alt={`Avatar of ${name ?? 'Guest'}`}
					className="rounded-full object-cover aspect-square"
					src={src || '/assets/no-avatar.svg'}
					loading="lazy"
				/>
			{/* </div> */}
		</div>
	)
}
