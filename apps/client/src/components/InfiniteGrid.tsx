import type { ListOfGifs } from '@giffy/types'
import { Grid } from './Grid'

type InfiniteGridProps = {
	data: ListOfGifs | { gifs: never[]; pos: string; page: number } | undefined
	ref: React.MutableRefObject<HTMLDivElement | null> | null
}

// export function InfiniteGrid(props: InfiniteGridProps) {
// 	const { data, ref } = props
// 	if (data !== undefined && data.gifs.length === 0) {
// 		return <div className="text-center font-medium text-3xl text-red-600">No hay resultados</div>
// 	}

// 	return (
// 		<>
// 			<div className="flex flex-col items-center justify-center">
// 				<Grid data={data} />
// 				<br />
// 				<div ref={ref} className="w-full border">
// 					{/* Observer */}
// 				</div>
// 				<br />
// 			</div>
// 		</>
// 	)
// }

import { forwardRef } from 'react'

export const InfiniteGrid = forwardRef<HTMLDivElement, InfiniteGridProps>(({ data }, ref) => {
	if (data !== undefined && data.gifs.length === 0) {
		return <div className="text-center font-medium text-3xl text-red-600">No hay resultados</div>
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<Grid data={data} />
			<br />
			<div ref={ref} className="w-full border">
				{/* Observer */}
			</div>
			<br />
		</div>
	)
})

InfiniteGrid.displayName = 'InfiniteGrid'
