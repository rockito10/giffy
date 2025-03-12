import { getTrendingListOfGifs } from '@/services/services'
import type { ListOfGifs } from '@giffy/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from './useInView'

type TrendingGifsProps = { page: string; pos: string }

export function useInfiniteTrending() {
	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<ListOfGifs>({
		queryKey: ['trending'],
		queryFn: ({ pageParam = { page: 1, pos: '' } }) => {
			const { pos, page } = pageParam as TrendingGifsProps
			return getTrendingListOfGifs({ pos, page: Number(page) })
		},

		initialPageParam: { page: 1, pos: '' },
		getNextPageParam: (lastPage) => {
			if (lastPage.gifs.length < 40) return undefined
			return { page: lastPage.page, pos: lastPage.pos }
		},
		select: (data) => {
			const allGifs = data.pages.flatMap((page) => page.gifs)
			return {
				pages: [
					{
						gifs: allGifs,
						pos: data.pages[data.pages.length - 1].pos,
						page: data.pages[data.pages.length - 1].page,
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
