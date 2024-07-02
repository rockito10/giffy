import { atom } from "nanostores"

import type { MappedGifs } from "../types/types"

export interface GifDataStore {
  $searchData: MappedGifs | null
  $searchQuery: string
}

export const $searchStore = atom<GifDataStore>({
  $searchData: null,
  $searchQuery: "",
})
