import { atom } from "nanostores"

import type { MappedGifs } from "../types/types"

// para JS, NO para React

interface SearchStore {
  $searchData: MappedGifs
  $searchQuery: string
}

export const $searchStore = atom<SearchStore>({
  $searchData: { gifs: [], next: "" },
  $searchQuery: "",
})

// Manejo de estados

const query = $searchStore.get().$searchQuery

const data = $searchStore.get().$searchData

const setQuery = (query: string) => {
  $searchStore.set({
    ...$searchStore.get(), // $searchData, $searchQuery
    $searchQuery: query,
  })
}

const setData = (data: MappedGifs) => {
  $searchStore.set({
    ...$searchStore.get(), // $searchData, $searchQuery
    $searchData: data,
  })
}

// Exportar estados y funciones

export const searchStore = {
  data,
  query,
  setData,
  setQuery,
}
