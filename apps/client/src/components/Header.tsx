import { useAuth } from '@/hooks/useAuth'
import { useMe } from '@/hooks/useMe'
import { Link, useLocation } from 'wouter'
import { Avatar } from './Avatar'
import { SearchBar } from './SearchBar'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ ...props }: HeaderProps) {
	const [location] = useLocation()
	const { avatar, getUserName } = useMe()
	const { logout, isAuthenticated } = useAuth()
	const username = getUserName()

	const isUploadPage = location === '/upload'

	return (
		<header {...props}>
			<div className="h-[120px] bg-black">
				<div className="flex items-center justify-between px-8 py-2">
					<div className="flex w-1/2 items-center gap-4">
						<Link
							to="/"
							className="flex gap-1 rounded p-2 transition-transform hover:scale-125"
							onClick={() => {
								;(document.getElementById('searchbar') as HTMLInputElement).value = ''
							}}
						>
							{/* <HomeIcon /> */}
							<span className="font-bold text-[1.35rem] text-gradient">GIFFY</span>
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

						{isAuthenticated ? (
							<button
								onClick={logout}
								className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700"
								type="button"
							>
								Logout
							</button>
						) : (
							<Link
								className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700"
								type="button"
								to="/login"
							>
								Sign In
							</Link>
						)}
						<div>
							<Avatar name={username} src={avatar} />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
