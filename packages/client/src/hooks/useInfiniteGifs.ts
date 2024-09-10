import { getGifs } from '@/services/services'
import type { MappedGifs } from '@/types/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'wouter'
import { useInView } from './useInView'

export function useInfiniteGifs() {
	const { query } = useParams()

	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<MappedGifs>({
		queryKey: [query],
		queryFn: ({ pageParam = '' }) => getGifs({ query, pos: pageParam }),
		getNextPageParam: (lastPage) => lastPage.next as string | undefined,
		initialPageParam: { next: '' },
		select: (data) => {
			const concatenatedGifs = data.pages.flatMap((page) => page.gifs)

			return {
				pages: [{ gifs: concatenatedGifs, next: '' }],
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

	return { data, ref, error, isLoading }
}
