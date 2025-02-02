import { useGiffyContext } from '@/hooks/useGiffyContext'
import { useLocation } from 'wouter'

export function SearchBar() {
	const { setQuery } = useGiffyContext()

	const [_, setLocation] = useLocation()

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = evt.target.value

		if (newQuery === '') return setLocation('/')

		setLocation(`/search/${newQuery}`)
		setQuery(newQuery)
	}

	return (
		<div className="relative w-full">
			<input
				type="text"
				placeholder="Dragon Ball, Frieren..."
				className="w-full rounded-full px-4 py-3 text-black focus:outline-none"
				onChange={handleChange}
			/>
			<button
				type="button"
				className="absolute top-0 right-0 m-1 rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700"
			>
				<span className="font-medium text-white">Search</span>
			</button>
		</div>
	)
}
