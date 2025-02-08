import { useMe } from '@/hooks/useMe'
import { Link, useLocation } from 'wouter'
import { Avatar } from './Avatar'
import { SearchBar } from './SearchBar'
import { HomeIcon } from './icons/HomeIcon'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ ...props }: HeaderProps) {
	const [location] = useLocation()
	const { avatar, username, setUserId, getSavedUserId, setUserName } = useMe()

	if (!username) return null
	const isUploadPage = location === '/upload'

	// console.log("username", username);

	const handleChangeUser = () => {
		if (getSavedUserId() === '1') {
			setUserId('2')
			setUserName('Goku')
		} else {
			setUserId('1')
			setUserName('Frieren')
		}

		window.location.reload()
	}

	return (
		<header {...props}>
			<div className="h-[80px] bg-black">
				<div className="flex items-center justify-between px-8 py-2">
					<div className="flex w-1/2 items-center">
						<Link
							to="/"
							className="flex gap-1 rounded px-4 py-2 transition-colors hover:text-purple-500"
							onClick={() => {
								;(document.getElementById('searchbar') as HTMLInputElement).value = ''
							}}
						>
							<HomeIcon />
							<span>Home</span>
						</Link>

						<SearchBar />
					</div>

					<div className="flex items-center gap-4">
						{!isUploadPage && (
							<Link
								to="/upload"
								className="rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700"
							>
								Upload
							</Link>
						)}
						<button
							className="rounded-full bg-red-500 px-4 py-2 transition-colors hover:bg-red-700"
							onClick={handleChangeUser}
							type="button"
						>
							ChangeUser
						</button>
						<div>
							<Avatar name={username} src={avatar} />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
