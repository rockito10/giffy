import { useMe } from '@/hooks/useMe'
import { Link } from 'wouter'
import { Avatar } from './Avatar'
import { Form } from './Form'
import { HomeIcon } from './icons/HomeIcon'

export function Header() {
	const { avatar, username, setUserId, getSavedUserId } = useMe()

	if (!username) return null

	// console.log("username", username);

	const handleChangeUser = () => {
		if (getSavedUserId() === '1') {
			setUserId('10')
		} else {
			setUserId('1')
		}

		window.location.reload()
	}

	return (
		<header className="bg-black">
			<div className="flex gap-2">
				{/* HOME */}
				<Link to="/" className="px-2 py-1 rounded hover:bg-white-500 flex gap-1">
					<HomeIcon />
					<span>Home</span>
				</Link>

				{/* Change User */}
				<button
					className="bg-green-600 px-2 py-1 rounded hover:bg-green-500"
					onClick={handleChangeUser}
					type="button"
				>
					Change User
				</button>

				{/* Upload GIF */}
				<Link to="/upload" className="bg-red-600 px-2 py-1 rounded hover:bg-red-500">
					Upload GIF
				</Link>
			</div>

			<div className="flex items-center justify-between px-8 py-2">
				<Form />

				<div>
					<Avatar name={username} src={avatar} />
					<h3>{username}</h3>
				</div>
			</div>
		</header>
	)
}
