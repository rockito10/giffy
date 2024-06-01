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
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} placeholder="Dragon Ball, Breaking Bad..." type="text" />

      <button type="submit">Buscar</button>
    </form>
  )
}
