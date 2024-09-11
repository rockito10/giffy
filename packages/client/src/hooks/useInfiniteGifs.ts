import type { ListOfGifs } from '@/types/new'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'wouter'
import { useInView } from './useInView'

const fetchListOfGifs = async ({ query, pos }: { query: string; pos: string }) => {
	const resp = await fetch(`/api/search/${query}}?pos=${pos}`)
	const data: ListOfGifs = await resp.json()

	return data
}

export function useInfiniteGifs() {
	const { query } = useParams()

	if (!query) return

	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<ListOfGifs>({
		queryKey: ['search', query],
		queryFn: ({ pageParam = '' }) => {
			const pos = typeof pageParam === 'string' ? pageParam : ''
			return fetchListOfGifs({ query, pos })
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
