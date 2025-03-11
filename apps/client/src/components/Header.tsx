import { useAuth } from '@/hooks/useAuth'
import { useMe } from '@/hooks/useMe'
import type React from 'react'
import { useRef } from 'react'
import { Link, useLocation } from 'wouter'
import { Avatar } from './Avatar'
import { HomeLink } from './HomeLink'
import { SearchBar } from './SearchBar'
import './Header.css'
import { LoginIcon } from './icons/LoginIcon'

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

export function AuthenticationButton({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { logout, isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return (
			<div {...props}>
				<button onClick={logout} type="button">
					Logout
				</button>
			</div>
		)
	}

	return (
		<div {...props}>
			<Link type="button" to="/login">
				Sign In
			</Link>
		</div>
	)

	// return (
	// 	<div {...props}>
	// 		{isAuthenticated ? (
	// 			<button onClick={logout} type="button">
	// 				Logout
	// 			</button>
	// 		) : (
	// 			<Link type="button" to="/login">
	// 				Sign In
	// 			</Link>
	// 		)}
	// 	</div>
	// )
}

export function Header({ ...props }: HeaderProps) {
	const [location] = useLocation()
	const { avatar, getUserName } = useMe()

	const username = getUserName()

	const isUploadPage = location === '/upload'

	const modalRef = useRef<HTMLDivElement>(null)

	const openMenu = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		document.activeElement instanceof HTMLElement && document.activeElement.blur() // 🔹 Quita el foco de cualquier input activo
		modalRef.current?.classList.toggle('open-modal')
		evt.currentTarget.classList.toggle('open-menu')
		modalRef.current?.focus() // 🔹 Mueve el foco al modal inmediatamente
	}

	return (
		<header {...props}>
			{/* ---------- Menu Mobile ---------- */}

			<div className="flex items-center gap-4 bg-black px-4 py-6 md:hidden">
				<SearchBar className="flex-1" />
				<button className="burger-button" type="button" onClick={openMenu}>
					<div />
					<div />
					<div />
				</button>
			</div>

			{/* Modal */}

			<div className="modal font-medium" ref={modalRef} tabIndex={-1}>
				<HomeLink className="w-fit px-4 py-6" />

				<section className="bg-[#000]">
					<div className="flex items-center gap-3 px-2 py-3">
						<Link to="/uploaded">
							<Avatar name={username} src={avatar} className="size-16" />
						</Link>
						<span className="text-xl">{username || 'Guest'}</span>
					</div>

					<div className="flex flex-col divide-y divide-[#303030] border border-[#303030]">
						<Link to="/upload" className="px-2 py-3">
							Upload a gif!
						</Link>
						<div className="flex gap-2">
							<AuthenticationButton className="px-2 py-3" />
							<LoginIcon className="w-5" />
						</div>
					</div>
				</section>
			</div>

			{/* ---------- DESKTOP ---------- */}

			<div className="hidden bg-black md:block py-2">
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

							<AuthenticationButton className="rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700 " />
						</div>

						<Link to="/uploaded" className="group">
							<Avatar name={username} src={avatar} className="aspect-square size-16" />
							<div className="relative flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
								<span className="-bottom-6 absolute rounded-md bg-[#28242f] px-4 py-1">
									{username || 'Guest'}
								</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
