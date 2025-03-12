import { getFavoriteGifs } from '@/services/services'
import type { ListOfGifs } from '@giffy/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from './useInView'

type FavoriteGifsProps = {
	userID: string
}

export function useInfiniteLikedGifs({ userID }: FavoriteGifsProps) {
	const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteQuery<ListOfGifs>({
		queryKey: ['favorites', userID],
		queryFn: ({ pageParam = 1 }) => {
			// page param habla de la página actual, el inicial está abajo en initialpageparam, y el siguiente (getNextPageParam) se encarga de actualizarlo
			return getFavoriteGifs({ page: pageParam as number, userID })
		},

		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			// si no hay más de 20 gifs, no hay más páginas, por lo tanto lo detengo (undefined detiene la paginación)
			if (lastPage.gifs.length < 20) return undefined
			return lastPage.page
		},
		select: (data) => {
			const allGifs = data.pages.flatMap((page) => page.gifs)
			return {
				pages: [
					{
						gifs: allGifs,
						pos: '',
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

	console.log('userId', userID, data)

	return { data: data?.pages[0], ref, error, isLoading }
}
