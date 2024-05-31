import { useRef } from "react"

import { useGifs } from "../hooks/useGifs"

export function Form() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { setQuery } = useGifs()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const value = inputRef.current?.value

    console.log("value", value)

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
