import { useMe } from '@/hooks/useMe'
import { Link } from 'wouter'
import { Avatar } from './Avatar'
import { Form } from './Form'

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
			<button
				className="bg-green-600 px-2 py-0.5 rounded hover:bg-green-500"
				onClick={handleChangeUser}
				type="button"
			>
				Cambiar User
			</button>
			<Link to="/upload" className="bg-red-600 px-2 py-1 rounded hover:bg-red-500">
				Upload GIF
			</Link>

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
