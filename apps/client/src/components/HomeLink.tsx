import type { HTMLAttributes } from 'react'
import { Link } from 'wouter'

interface HomeLinkProps extends HTMLAttributes<HTMLAnchorElement> {}

export function HomeLink({ ...props }: HomeLinkProps) {
	return (
		<Link to="/" {...props}>
			<span className="flex items-center gap-1 rounded p-2 font-bold text-[1.35rem] text-gradient transition-transform hover:scale-125">
				GIFFY
			</span>
		</Link>
	)
}
