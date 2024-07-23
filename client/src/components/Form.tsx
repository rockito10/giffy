import { useRef } from "react"
import { useGiffyContext } from "../hooks/useGiffyContext"
import { useLocation } from "wouter"

export function Form() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { setQuery } = useGiffyContext()

  const [, setLocation] = useLocation()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value)
    setLocation(`/search/${evt.target.value}`)
  }

  return (
    <form className="w-1/2 font-semibold text-black" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <input
          ref={inputRef}
          className="flex-1 rounded-bl-lg rounded-tl-lg border px-4 py-2"
          placeholder="Dragon Ball, Breaking Bad..."
          type="text"
          onChange={handleChange}
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
