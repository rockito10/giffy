import { getListOfGifs } from '@/services/services'
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

	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<ListOfGifs>({
		queryKey: ['search', { query, page_n }], // Agregar page_n al queryKey
		queryFn: ({ pageParam = '' }) => {
			const pos = typeof pageParam === 'string' ? pageParam : ''
			return getListOfGifs({ query, pos, page: page_n })
		},

		initialPageParam: '',
		getNextPageParam: (lastPage) => lastPage.page + 1,
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

// import { getListOfGifs } from '@/services/services'
// import type { ListOfGifs } from '@giffy/types'
// import { useEffect, useState } from 'react'
// import { useParams } from 'wouter'
// import { useInView } from './useInView'

// export function useInfiniteGifs() {
// 	const { query } = useParams()

// 	const [data, setData] = useState<ListOfGifs>({ gifs: [], pos: '', page: 1 })

// 	// console.log('dataaaaaaa', data, query)

// 	if (!query) {
// 		//caso predeterminado
// 		setData({ gifs: [], pos: '', page: 1 })
// 		return
// 	}

// 	// if (!data) {

// 	// 	return
// 	// }

// 	//  useEffect()

// 	const { page, pos } = data
// 	const page_n = Number(page)

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
// 	useEffect(() => {
// 		try {
// 			getListOfGifs({ query, pos, page: 1 }).then((res) => setData(res))
// 		} catch (error) {
// 			console.log('Error fetching gifs', error)
// 		}
// 	}, [query])

// 	// const hasNextPage = data.gifs.length > 0
// 	const fetchNextPage = () => {
// 		getListOfGifs({ query, pos, page: page_n }).then((newResponse) =>
// 			setData((prevState) => {
// 				return {
// 					gifs: [...prevState.gifs, ...newResponse.gifs],
// 					pos: newResponse.pos,
// 					page: page_n + 1,
// 				}
// 			}),
// 		)
// 	}

// 	const { inView, ref } = useInView({
// 		rootMargin: '0px 0px 0px 0px',
// 	})

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
// 	useEffect(() => {
// 		// fetchNextPage()
// 		// if (inView) {
// 		fetchNextPage()
// 		// }
// 	}, [inView])

// 	return { data, ref }
// }
