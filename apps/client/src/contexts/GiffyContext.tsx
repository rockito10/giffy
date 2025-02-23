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
	data: { gifs: [], next: '' },
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
	const [data, setData] = useState<ListOfGifs>({ gifs: [], next: '' })

	const concatData = (newData: ListOfGifs) => {
		setData((prevData) => {
			return {
				gifs: [...prevData.gifs, ...newData.gifs],
				next: newData.next,
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
