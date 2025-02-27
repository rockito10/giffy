import { useLocation } from 'wouter'

export function SearchBar() {
	const [getLocation, setLocation] = useLocation()

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = evt.target.value

		if (newQuery === '') return setLocation('/')
		// const navigationType = useNavigationType(); // 'PUSH', 'POP', or 'REPLACE' //USAR PARA CUANDO VAS HACIA ATRÁS EN LAS PÁGINAS

		setLocation(`/search/${newQuery}`)
	}

	const handleSearch = () => {
		return () => {
			const query = (document.getElementById('searchbar') as HTMLInputElement).value
			if (query === '') return
			setLocation(`/search/${query}`)
		}
	}

	return (
		<div className="relative w-full">
			<input
				type="text"
				placeholder="Dragon Ball, Frieren..."
				className="w-full rounded-full px-4 py-3 text-black focus:outline-none"
				onChange={handleChange}
				// value={getLocation.match('/search') ? getLocation.split('/search/')[1] : ''}
				id="searchbar"
			/>
			<button
				type="button"
				className="absolute top-0 right-0 m-1 rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700"
				onClick={handleSearch()}
			>
				<span className="font-medium text-white">Search</span>
			</button>
		</div>
	)
}
