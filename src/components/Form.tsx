import { useRef } from "react"

interface Props {
  setQuery: (query: string) => void
}

export function Form({ setQuery }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const value = inputRef.current?.value

    if (!value) return

    setQuery(value)
  }

  return (
    <form className="font-semibold" onSubmit={handleSubmit}>
      <div className="">
        <input
          ref={inputRef}
          className="w-1/3 rounded-bl-lg rounded-tl-lg border px-4 py-2"
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
