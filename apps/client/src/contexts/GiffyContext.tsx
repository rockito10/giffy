import type { ListOfGifs } from '@giffy/types'
import { createContext, useState } from 'react'

// ---------- Context ----------

interface GiffyContextType {
	data: ListOfGifs
	query: string
	setData: (data: ListOfGifs) => void
	setQuery: (query: string) => void
	concatData: (newGifs: ListOfGifs) => void
}

export const GiffyContext = createContext<GiffyContextType>({
	data: { gifs: [], pos: '', page: 1 },
	query: '',
	setData: () => {},
	setQuery: () => {},
	concatData: () => {},
})

// ---------- Provider ----------

interface Props {
	children: React.ReactNode
}

export function GiffyContextProvider({ children }: Props) {
	const [query, setQuery] = useState('')
	const [data, setData] = useState<ListOfGifs>({ gifs: [], pos: '', page: 1 })

	const concatData = (newData: ListOfGifs) => {
		setData((prevData) => {
			return {
				gifs: [...prevData.gifs, ...newData.gifs],
				pos: newData.pos,
				page: newData.page,
			}
		})
	}

	return (
		<GiffyContext.Provider
			value={{
				data,
				query,
				setData,
				setQuery,
				concatData,
			}}
		>
			{children}
		</GiffyContext.Provider>
	)
}
