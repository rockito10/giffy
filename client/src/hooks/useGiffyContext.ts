import { useContext } from "react"
import { GiffyContext } from "../context/GiffyContext"

export function useGiffyContext() {
  const { data, query, setData, setQuery, concatData } = useContext(GiffyContext)
  return { data, query, setData, setQuery, concatData }
}
