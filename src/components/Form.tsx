import { useRef } from "react"

// import { $searchStore } from "../store/search"

interface Props {
  setQuery: (query: string) => void
}

export function Form({ setQuery }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const value = inputRef.current?.value

    // if (!$searchStore.get()) return

    setQuery(value)

    // $searchStore.set({
    //   $searchData: {
    //     data: [],
    //     next: "",
    //   },
    //   $searchQuery: $searchQuery.get() || "",
    // })
  }

  return (
    <form className="w-1/2 font-semibold" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <input
          ref={inputRef}
          className="flex-1 rounded-bl-lg rounded-tl-lg border px-4 py-2"
          placeholder="Dragon Ball, Breaking Bad..."
          type="text"
          // value={$searchStore.get().$searchQuery ? $searchStore.get().$searchQuery : ""}
          onChange={(evt) => setQuery(evt.target.value)}
        />

        <button
          className="rounded-br-lg rounded-tr-lg border bg-purple-700 px-4 py-2 transition-colors hover:bg-purple-500"
          type="submit"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}
