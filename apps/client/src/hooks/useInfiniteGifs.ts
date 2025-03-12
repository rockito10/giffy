import { getQueryListOfGifs } from '@/services/services'
import type { ListOfGifs } from '@giffy/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'wouter'
import { useInView } from './useInView'

export function useInfiniteGifs() {
	const { query, page = '1' } = useParams()
	const page_n = Number(page) || 1

	if (!query) {
		// Caso predeterminado
		return { data: { gifs: [], pos: '', page: 1 }, ref: null, error: null, isLoading: false }
	}

	type InfiniteQueryParams = { pos: string; page: string }

	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<ListOfGifs>({
		queryKey: ['search', { query, page_n }], // Agregar page_n al queryKey
		queryFn: ({ pageParam = { page: 1, pos: '' } }) => {
			const { page, pos } = pageParam as InfiniteQueryParams

			return getQueryListOfGifs({ query, pos, page: Number(page) })
		},

		initialPageParam: { page: 1, pos: '' },
		getNextPageParam: (lastPage) => {
			if (lastPage.gifs.length < 40) return undefined
			return { page: lastPage.page, pos: lastPage.pos }
		},
		select: (data) => {
			const newData = data.pages.flatMap((page) => page.gifs)
			return {
				pages: [
					{
						gifs: newData,
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

// -.------------------------------------------------------------------------------
