interface Props {
	name?: string | null | undefined
	src: string | null | undefined
	nameless?: boolean
}

export function Avatar({ name, src, nameless }: Props) {
	return (
		<div className="relative flex items-center justify-center gap-2">
			{nameless ? null : (
				<span className="-bottom-6 absolute rounded-md bg-[#28242f] px-4 py-1">
					{name || 'Guest'}
				</span>
			)}
			<img
				alt={`Avatar of ${name ?? 'Guest'}`}
				className="size-16 rounded-full object-cover"
				src={src || '/assets/no-avatar.svg'}
				loading="lazy"
			/>
		</div>
	)
}
