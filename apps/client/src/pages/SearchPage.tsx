import { InfiniteGrid } from '@/components/InfiniteGrid'
import { useInfiniteGifs } from '@/hooks/useInfiniteGifs'

export default function SearchPage() {
	const { data, ref } = useInfiniteGifs()

	return (
		<div>
			<InfiniteGrid data={data} ref={ref} />
		</div>
	)
}
