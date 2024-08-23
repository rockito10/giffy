import { useLocation } from "wouter"
import { useGiffyContext } from "../hooks/useGiffyContext"

export function Form() {
  const { setQuery } = useGiffyContext()

  const [location, setLocation] = useLocation()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = evt.target.value
    setQuery(newQuery)
    setLocation(`/search/${newQuery}`)
  }

  return (
    <form className="w-1/2 font-semibold text-black" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <input
          className="flex-1 rounded-bl-lg rounded-tl-lg border px-4 py-2"
          placeholder="Dragon Ball, Breaking Bad..."
          type="text"
          value={location.split("/search/")[1]}
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
