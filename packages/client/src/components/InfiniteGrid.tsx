import { useInfiniteGifs } from '@/hooks/useInfiniteGifs'
import { Grid } from './Grid'

export function InfiniteGrid() {
	const { data, ref } = useInfiniteGifs()

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<Grid data={data?.pages[0]} />
				<br />
				<div ref={ref} className="border">
					{/* Observer */}
				</div>
				<br />
			</div>
		</>
	)
}
