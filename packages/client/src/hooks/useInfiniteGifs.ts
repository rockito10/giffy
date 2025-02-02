import { getListOfGifs } from '@/services/services'
import type { ListOfGifs } from '@/types/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'wouter'
import { useInView } from './useInView'

export function useInfiniteGifs() {
	const { query } = useParams()

	if (!query) {
		//caso predeterminado
		return { data: { gifs: [], next: '0' }, ref: null, error: null, isLoading: false }
	}

	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<ListOfGifs>({
		queryKey: ['search', query],
		queryFn: ({ pageParam = '' }) => {
			const pos = typeof pageParam === 'string' ? pageParam : ''
			return getListOfGifs({ query, pos })
		},

		initialPageParam: '',
		getNextPageParam: (lastPage) => lastPage.next,
		select: (data) => {
			const newData = data.pages.flatMap((page) => page.gifs)
			return {
				pages: [{ gifs: newData, next: '' }],
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
