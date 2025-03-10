import { useAuth } from '@/hooks/useAuth'
import { useMe } from '@/hooks/useMe'
import type React from 'react'
import { Link, useLocation } from 'wouter'
import { Avatar } from './Avatar'
import { HomeLink } from './HomeLink'
import { SearchBar } from './SearchBar'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

interface BurgerButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function BurgerButton({ ...props }: BurgerButtonProps) {
	return (
		<button type="button" {...props}>
			<div className="flex w-8 flex-col gap-2 transition-transform hover:scale-105">
				<div className="ml-auto h-1 w-3/4 bg-white" />
				<div className="h-1 w-full bg-white" />
				<div className="h-1 w-3/4 bg-white" />
			</div>
		</button>
	)
}

export function Header({ ...props }: HeaderProps) {
	const [location] = useLocation()
	const { avatar, getUserName } = useMe()
	const { logout, isAuthenticated } = useAuth()
	const username = getUserName()

	const isUploadPage = location === '/upload'

	const openMenu = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		evt.currentTarget
	}

	return (
		<header {...props}>
			{/* ---------- MOBILE ---------- */}

			<div className="grid h-24 place-items-center bg-black md:hidden">
				<div className="flex w-full items-center justify-between gap-4 p-4">
					<SearchBar className="flex-1" />

					<BurgerButton onClick={openMenu} />
				</div>
			</div>

			{/* MODAL */}
			{/* <div className="absolute inset-0 z-50 bg-purple-500">asdfsafas</div> */}

			{/* ---------- DESKTOP ---------- */}

			<div className="hidden h-[120px] bg-black md:block">
				<div className="flex items-center justify-between px-8 py-2 ">
					<div className="flex w-full items-center gap-4">
						<HomeLink />
						<SearchBar className="w-4/5" />
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center gap-4 ">
							{!isUploadPage && (
								<Link
									to="/upload"
									className="rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700 "
								>
									Upload
								</Link>
							)}

							{isAuthenticated ? (
								<button
									onClick={logout}
									className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700 "
									type="button"
								>
									Logout
								</button>
							) : (
								<Link
									className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700 "
									type="button"
									to="/login"
								>
									Sign In
								</Link>
							)}
						</div>

						<Avatar name={username} src={avatar} className="aspect-square size-16" />
					</div>
				</div>
			</div>
		</header>
	)
}
