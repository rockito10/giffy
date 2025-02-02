interface Props {
	name: string
	src: string | undefined
}

export function Avatar({ name, src }: Props) {
	return (
		<div className="group">
			<img
				alt={`Avatar of ${name}`}
				className="size-16 rounded-full object-cover"
				src={src ?? '/assets/no-avatar.svg'}
				title={name}
			/>

			{/* <span className="opacity-0 transition-opacity group-hover:opacity-100">
				<span className="rounded-full bg-purple-500 px-4 py-2">{name}</span>
			</span> */}
		</div>
	)
}
