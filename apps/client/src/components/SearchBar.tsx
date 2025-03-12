import { useEffect, useRef } from 'react'
import { useLocation } from 'wouter'

interface SearchBarProps extends React.HTMLProps<HTMLDivElement> {}

export function SearchBar({ ...props }: SearchBarProps) {
	const [getLocation, setLocation] = useLocation()
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (ref.current) {
			ref.current.value = getLocation.match('/search') ? getLocation.split('/search/')[1] : ''
		}
	}, [])

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = evt.target.value

		if (newQuery === '') return setLocation('/')
		// const navigationType = useNavigationType(); // 'PUSH', 'POP', or 'REPLACE' //USAR PARA CUANDO VAS HACIA ATRÁS EN LAS PÁGINAS

		setLocation(`/search/${newQuery}`)
	}

	const handleSearch = () => {
		const query = (document.getElementById('searchbar') as HTMLInputElement).value
		if (query === '') return
		setLocation(`/search/${query}`)
	}

	return (
		<div {...props}>
			<div className="relative w-full">
				<input
					type="text"
					placeholder="Dragon Ball, Frieren..."
					className="w-full min-w-40 rounded-full px-2 py-2 text-black focus:outline-none md:px-4 md:py-3"
					onChange={handleChange}
					id="searchbar"
					ref={ref}
				/>
				<button
					type="button"
					className="absolute top-0 right-0 z-0 m-1 rounded-full bg-purple-500 px-2 py-1 transition-colors hover:bg-purple-700 md:px-4 md:py-2"
					onClick={handleSearch}
				>
					<span className="font-medium text-white">Search</span>
				</button>
			</div>
		</div>
	)
}
