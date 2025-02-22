import { getTrendingListOfGifs } from '@/services/services'
import type { ListOfGifs } from '@giffy/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'wouter'
import { useInView } from './useInView'

export function useInfiniteTrending() {
	const { page = '1' } = useParams()
	const page_n = Number(page) || 1

	// if (!query) {
	// 	// Caso predeterminado
	// 	return { data: { gifs: [], pos: '', page: 1 }, ref: null, error: null, isLoading: false }
	// }

	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<ListOfGifs>({
		queryKey: ['trending'], // Agregar page_n al queryKey
		queryFn: ({ pageParam = '' }) => {
			const pos = typeof pageParam === 'string' ? pageParam : ''
			console.log(pageParam)
			return getTrendingListOfGifs({ pos, page: page_n })
		},

		initialPageParam: '',
		getNextPageParam: (lastPage) => lastPage.pos,
		select: (data) => {
			const allGifs = data.pages.flatMap((page) => page.gifs)
			return {
				pages: [
					{
						gifs: allGifs,
						pos: data.pages[data.pages.length - 1].pos,
						page: 1,
					},
				],
				pageParams: data.pageParams,
			}
		},
	})

	const { inView, ref } = useInView({
		rootMargin: '0px 0px 500px 0px',
	})

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, fetchNextPage, hasNextPage])

	return { data: data?.pages[0], ref, error, isLoading }
}
