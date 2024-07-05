import { useStore } from "@nanostores/react"

import { $searchStore, searchStore } from "../store/searchStore"

// para React, NO para JS

export function useSearchStore() {
  const { $searchData, $searchQuery } = useStore($searchStore)

  return {
    data: $searchData,
    query: $searchQuery,
    setData: searchStore.setData,
    setQuery: searchStore.setQuery,
  }
}
