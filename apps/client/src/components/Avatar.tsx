interface Props {
	name: string | null
	src: string | null
}

export function Avatar({ name, src }: Props) {
	console.log('Avatar', { name, src })
	return (
		<div className="relative flex items-center justify-center gap-2">
			<span className="-bottom-6 absolute rounded-md bg-[#28242f] px-4 py-1">
				{name || 'Guest'}
			</span>
			<img
				alt={`Avatar of ${name ?? 'Guest'}`}
				className="size-16 rounded-full object-cover"
				src={src || '/assets/no-avatar.svg'}
			/>
		</div>
	)
}
