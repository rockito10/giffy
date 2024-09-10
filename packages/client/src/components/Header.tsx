import { useMe } from '@/hooks/useMe'
import { Avatar } from './Avatar'
import { Form } from './Form'

export function Header() {
	const { avatar, username, setUserId, getSavedUserId } = useMe()

	if (!username) return null

	const handleChangeUser = () => {
		if (getSavedUserId() === '3' || getSavedUserId() === '2') {
			setUserId('10')
		} else {
			setUserId('3')
		}

		window.location.reload()
	}

	return (
		<header className="bg-black">
			<button className="bg-black px-4 py-2 text-white" onClick={handleChangeUser}>
				Cambiar User
			</button>

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
