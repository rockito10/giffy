import { useAuth } from '@/hooks/useAuth'
import type { LoginInfo } from '@giffy/types'
import type { FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'wouter'

export default function LoginPage() {
	const { login } = useAuth()

	async function handleLogin(evt: FormEvent<HTMLFormElement>): Promise<void> {
		evt.preventDefault()

		const form = evt.target as HTMLFormElement
		const username = form.elements.namedItem('username') as HTMLInputElement
		const password = form.elements.namedItem('password') as HTMLInputElement

		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username.value,
				password: password.value,
			}),
			credentials: 'include',
		})

		if (!response.ok) {
			toast.error('Invalid credentials')
			return
		}

		toast.info('Login successful')

		const { data } = (await response.json()) as { data: LoginInfo }

		login(data.id, data.username)
	}

	return (
		<div className="text-white">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					{/* <img alt="Your Company" src="/public/favicon.png" className="mx-auto h-10 w-auto" /> */}
					<div className="relative flex justify-center">
						<h2 className="mt-10 text-center font-bold text-2xl/9 text-gradient">Giffy</h2>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 35" className="absolute w-20">
							<title>GIFFY</title>
							<g fill-rule="evenodd" clip-rule="evenodd">
								<path fill="#00ff99" d="M0 3h4v29H0z" />
								<path fill="#9933ff" d="M24 11h4v21h-4z" />
								<path fill="#00ccff" d="M0 31h28v4H0z" />
								<path fill="#fff35c" d="M0 0h16v4H0z" />
								<path fill="#ff6666" d="M24 8V4h-4V0h-4v12h12V8" />
								<path d="M24 16v-4h4M16 0v4h-4" />
							</g>
						</svg>
					</div>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form method="POST" className="space-y-6" onSubmit={handleLogin}>
						<div>
							<label htmlFor="username" className="block font-medium text-sm/6">
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="username"
									required
									autoComplete="username"
									className="-outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block font-medium text-sm/6">
									Password
								</label>
								<div className="text-sm">
									<Link to="/404" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</Link>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									required
									autoComplete="current-password"
									className="-outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2"
							>
								Sign in
							</button>
						</div>
					</form>

					{/* <p className="mt-10 text-center text-gray-500 text-sm/6">
						Not a member?{' '}
						<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
							Start a 14 day free trial
						</a>
					</p> */}
				</div>
			</div>
		</div>
	)
}
