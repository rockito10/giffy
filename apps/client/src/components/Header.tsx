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
				<div className="flex items-center justify-between px-8 py-2 ">
					<div className="flex w-1/2 flex-col items-center gap-4 sm:flex-row">
						{/* <HomeIcon /> */}
						
						<Link
                            to="/"
                            className="flex items-center gap-1 rounded p-2 transition-transform hover:scale-125"
                            onClick={() => {
                                ;(document.getElementById('searchbar') as HTMLInputElement).value = ''
                            }}
                        >
                            <span className="font-bold text-[1.35rem] text-gradient sm:order-0">GIFFY</span>
                        </Link>
						<div className="sm:order-1">
							<SearchBar />
						</div>
					</div>

					<div className="flex items-center gap-4 sm:flex-row">
						<div className="flex flex-col items-center gap-4 sm:flex-row">
							{!isUploadPage && (
								<Link
									to="/upload"
									className="rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700 sm:order-2"
								>
									Upload
								</Link>
							)}

							{isAuthenticated ? (
								<button
									onClick={logout}
									className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700 sm:order-1"
									type="button"
								>
									Logout
								</button>
							) : (
								<Link
									className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700 sm:order-1"
									type="button"
									to="/login"
								>
									Sign In
								</Link>
							)}
						</div>
						<div className="sm:order-3">
							<Avatar name={username} src={avatar} />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
