import { useRef } from "react"

import { useSearchStore } from "../hooks/useSearchStore"

export function Form() {
  const { setQuery } = useSearchStore()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const value = inputRef.current?.value

    if (!value) return

    setQuery(value)
  }

  return (
    <form className="w-1/2 font-semibold" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <input
          ref={inputRef}
          className="flex-1 rounded-bl-lg rounded-tl-lg border px-4 py-2"
          placeholder="Dragon Ball, Breaking Bad..."
          type="text"
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
