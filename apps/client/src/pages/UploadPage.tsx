import { useMe } from '@/hooks/useMe'
import type { UploadResponseJSON } from '@giffy/types'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'wouter'

export default function UploadPage() {
	const reader = new FileReader()
	const [gif, setGif] = useState<File | null>(null)
	const [base64Data, setBase64Data] = useState<string>('') // Guardar la imagen en base64 en el estado
	const [tags, setTag] = useState<string[]>([])
	const tagRef = useRef<HTMLInputElement | null>(null)
	const formRef = useRef<HTMLFormElement | null>(null)
	const [_, setLocation] = useLocation()
	const { getSavedUserId, getUserName } = useMe()
	const username = getUserName()

	const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const file = e.dataTransfer.files[0]

		if (file.type !== 'image/gif') {
			return
		}

		if (file) {
			reader.onload = () => {
				setGif(file) // Guardar la imagen en base64 en el estado
				setBase64Data(reader.result as string) // Guardar la imagen en base64 en el estado
			}
			reader.readAsDataURL(file) // Leer el archivo como una URL base64
		}
	}

	const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const addTag = (tag: string) => {
		if (tags.length > 10) return // max amount of tags is 10
		setTag([...new Set([tag, ...tags])])
	}

	function handleAddTag(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()

		if (
			tagRef.current &&
			tagRef.current.value.trim().length <= 20 &&
			tagRef.current.value.trim() !== ''
		) {
			// max length is 20
			addTag(tagRef.current.value.trim())
			tagRef.current.value = ''
		}
	}

	function handleDeleteTag(key: string) {
		setTag((prevState) => {
			return prevState.filter((tag) => tag !== key)
		})
	}

	function resetUploadGif() {
		formRef.current?.reset()
		setTag([])
		setGif(null)
	}

	const handleSubmit = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		evt.preventDefault()

		const title = (formRef.current?.querySelector('#form-title') as HTMLInputElement).value
		const description = (formRef.current?.querySelector('#form-description') as HTMLInputElement)
			?.value

		if (!title || !gif) return

		const formData = new FormData()
		formData.append('file', gif)
		formData.append('alt', title)
		formData.append('title', title)
		formData.append('description', description)
		formData.append('tags', JSON.stringify(tags))
		formData.append('authorName', username ?? '')
		formData.append('authorId', getSavedUserId() ?? '')

		try {
			resetUploadGif()
			const uploadResponse = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})

			if (!uploadResponse.ok) throw new Error('Upload failed')

			// popups
			toast.success('Gif uploaded successfully!', {
				position: 'top-center',
				autoClose: 5000,

				progressClassName: 'bg-purple-500',
				theme: 'dark',
			})

			const { id } = (await uploadResponse.json()) as UploadResponseJSON
			setLocation(`/gif/${id}`)
		} catch (error) {
			console.error('Error:', error)
			// popups
			toast.error('Error uploading your gif.', {
				position: 'top-center',
				autoClose: 5000,

				progressClassName: 'bg-purple-500 text-purple-500',

				theme: 'dark',
			})
		}
	}

	return (
		<div>
			<ToastContainer />
			<div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
				{/* --------------- DRAG & DROP ---------------*/}

				<div className="relative aspect-square w-1/3 min-w-72">
					<div
						className="drag-and-drop aspect-square"
						onDrop={handleOnDrop}
						onDragOver={handleOnDragOver}
					>
						{!gif && <span className="drag-and-drop-text">DRAG HERE</span>}
					</div>

					{gif && (
						<img
							src={base64Data}
							alt={'imagen'}
							className="-translate-x-1/2 -translate-y-1/2 -z-10 absolute top-1/2 left-1/2 max-h-[90%] w-3/4 rounded-md object-contain"
						/>
					)}
				</div>

				{/* --------------- FORM ---------------*/}
				<form className="w-full space-y-4 p-4" ref={formRef}>
					<input
						type="text"
						className="w-full max-w-[50vw] rounded-lg border border-white/70 bg-black px-2 py-0.5 text-white"
						placeholder="Add title!"
						required
						id="form-title"
					/>
					<textarea
						id="form-description"
						className="w-full max-w-[50vw] resize-none rounded-lg border border-white/70 bg-black px-2 py-0.5 text-white"
						placeholder="Add a description!"
					/>
					{/* Agregar Tags */}
					<div className="flex gap-2">
						<input
							ref={tagRef}
							type="text"
							className="tag-input w-1/2 rounded-lg border border-white/70 bg-black px-2 py-0.5 text-white"
							placeholder="Add tag"
							maxLength={20}
						/>
						<button
							type="submit"
							onClick={handleAddTag}
							className="rounded-lg border border-white/70 bg-black px-2 py-0.5 transition-colors hover:bg-white hover:text-black"
						>
							+
						</button>
						{/* --------------- */}
					</div>
					{/* Contendor de Tags */}
					<div className="flex flex-wrap gap-4">
						{tags.map((tag) => {
							return (
								<button
									type="button"
									onClick={() => handleDeleteTag(tag)}
									key={tag}
									className="cursor-not-allowed rounded-lg border px-2 py-1 transition-colors hover:bg-white/90 hover:text-black"
								>
									{tag}
								</button>
							)
						})}
					</div>
					{/* --------------- */}

					{gif && (
						<button
							type="submit"
							onClick={handleSubmit}
							className="rounded-lg border border-purple-500/70 bg-purple-500 p-2 transition-colors hover:bg-purple-600"
						>
							Upload
						</button>
					)}
				</form>
			</div>
		</div>
	)
}
