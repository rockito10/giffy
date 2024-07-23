import { createContext, useState } from "react"
import type { MappedGifs } from "../types/types"

// ---------- Context ----------

interface GiffyContextType {
  data: MappedGifs
  query: string
  setData: (data: MappedGifs) => void
  setQuery: (query: string) => void
}

export const GiffyContext = createContext<GiffyContextType>({
  data: { gifs: [], next: "" },
  query: "",
  setData: () => {},
  setQuery: () => {},
})

// ---------- Provider ----------

interface Props {
  children: React.ReactNode
}

export function GiffyContextProvider({ children }: Props) {
  const [query, setQuery] = useState("")
  const [data, setData] = useState<MappedGifs>({ gifs: [], next: "" })

  return (
    <GiffyContext.Provider
      value={{
        data,
        query,
        setData,
        setQuery,
      }}
    >
      {children}
    </GiffyContext.Provider>
  )
}
