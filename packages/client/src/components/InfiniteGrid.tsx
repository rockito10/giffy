import { useInfiniteGifs } from '@/hooks/useInfiniteGifs'
import { Grid } from './Grid'

export function InfiniteGrid() {
	const { data, error, isLoading, ref } = useInfiniteGifs()

	console.log(data, error, isLoading, ref)

	if (error) return <div>Error</div>

	if (isLoading) return <div>Loading...</div>

	if (data !== undefined && data.gifs.length === 0) {
		return <div className="text-red-600 font-medium text-3xl text-center">No hay resultados</div>
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<Grid data={data} />
				<br />
				<div ref={ref} className="border">
					{/* Observer */}
				</div>
				<br />
			</div>
		</>
	)
}
