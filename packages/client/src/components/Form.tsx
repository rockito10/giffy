import { useGiffyContext } from '@/hooks/useGiffyContext'
import { useLocation } from 'wouter'

export function Form() {
	const { setQuery, query } = useGiffyContext()

	const [location, setLocation] = useLocation()

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()
	}

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = evt.target.value
		setLocation(`/search/${newQuery}`)
		setQuery(newQuery)
	}

	return (
		<form className="w-1/2 font-semibold text-black" onSubmit={handleSubmit}>
			<div className="flex w-full">
				<input
					className="flex-1 rounded-bl-lg rounded-tl-lg border px-4 py-2"
					placeholder="Dragon Ball, Breaking Bad..."
					type="text"
					value={query ?? location.split('/search/')[1]}
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
