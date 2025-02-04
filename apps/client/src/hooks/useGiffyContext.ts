import { GiffyContext } from '@/contexts/GiffyContext'
import { useContext } from 'react'

export function useGiffyContext() {
	const { data, query, setData, setQuery, concatData } = useContext(GiffyContext)
	return { data, query, setData, setQuery, concatData }
}
