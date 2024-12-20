import { useRef, useState } from 'react'

export default function UploadPage() {
	const reader = new FileReader()
	const [src, setSrc] = useState('')
	const [tags, setTag] = useState<string[]>([])
	const tagRef = useRef<HTMLInputElement | null>(null)

	const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const file = e.dataTransfer.files[0]

		if (file) {
			reader.onload = () => {
				setSrc(reader.result as string) // Guardar la imagen en base64 en el estado
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

	return (
		<div>
			<div className="flex gap-8 md:flex-row flex-col md:items-center items-start">
				{/* --------------- DRAG & DROP ---------------*/}

				<div className="relative aspect-square w-1/3 min-w-72">
					<div
						className="aspect-square drag-and-drop"
						onDrop={handleOnDrop}
						onDragOver={handleOnDragOver}
					>
						{!src && <span className="drag-and-drop-text">DRAG HERE</span>}
					</div>

					{src && (
						<img
							src={src}
							alt={'imagen'}
							className="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-md max-h-[90%] object-contain -z-10"
						/>
					)}
				</div>

				{/* --------------- FORM ---------------*/}
				<form className="space-y-4 p-4 w-full">
					<input
						type="text"
						className="w-full rounded-lg border border-white/70 bg-black px-2 py-0.5 text-white max-w-[50vw]"
						placeholder="Add title!"
						required
					/>
					<textarea
						className="w-full resize-none rounded-lg border border-white/70 bg-black px-2 py-0.5 text-white max-w-[50vw]"
						placeholder="Add a description!"
					/>
					{/* Agregar Tags */}
					<div className="flex gap-2">
						<input
							ref={tagRef}
							type="text"
							className="w-1/2 rounded-lg border border-white/70 bg-black px-2 py-0.5 text-white tag-input"
							placeholder="Add tag"
							maxLength={20}
						/>
						<button
							type="submit"
							onClick={handleAddTag}
							className="border border-white/70 bg-black px-2 py-0.5 hover:bg-white hover:text-black transition-colors rounded-lg"
						>
							+
						</button>
						{/* --------------- */}
					</div>
					{/* Contendor de Tags */}
					<div className="flex gap-4 flex-wrap">
						{tags.map((tag) => {
							return (
								<button
									type="button"
									onClick={() => handleDeleteTag(tag)}
									key={tag}
									className="rounded-lg border px-2 py-1 transition-colors hover:bg-white/90 hover:text-black cursor-not-allowed"
								>
									{tag}
								</button>
							)
						})}
					</div>

					{src && (
						<button
							type="submit"
							className="border border-purple-500/70 bg-purple-500 p-2 hover:bg-purple-600 transition-colors rounded-lg"
						>
							Upload
						</button>
					)}
				</form>
			</div>
		</div>
	)
}
