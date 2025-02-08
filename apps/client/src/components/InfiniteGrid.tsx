import { useInfiniteGifs } from '@/hooks/useInfiniteGifs'
import { Grid } from './Grid'

export function InfiniteGrid() {
	const { data, ref } = useInfiniteGifs()

	// console.log('data from InfiniteGrid', data)

	// if (error) return <div>Error</div>

	// if (isLoading) return <div>Loading...</div>

	if (data !== undefined && data.gifs.length === 0) {
		return <div className="text-center font-medium text-3xl text-red-600">No hay resultados</div>
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<Grid data={data} />
				<br />
				<div ref={ref} className="w-full border">
					{/* Observer */}
				</div>
				<br />
			</div>
		</>
	)
}
