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
		if (tags.length > 10 && tag.trim().length <= 20) return // max amount of tags is 10 // max lenght is 20
		setTag([...new Set([tag, ...tags])])
	}

	function handleAddTag(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()

		if (tagRef.current) addTag(tagRef.current.value.trim())
	}

	return (
		<div>
			<div className="flex gap-9">
				<div className="relative size-1/3 aspect-square">
					{/* Drag & Drop */}
					<div
						className="aspect-square dashed-border min-w-[50%]"
						onDrop={handleOnDrop}
						onDragOver={handleOnDragOver}
					/>

					{/*  */}
					{src && (
						<img
							src={src}
							alt={'imagen'}
							className="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-md"
						/>
					)}
				</div>

				<form className="space-y-4">
					<input
						type="text"
						className="h-16 w-full resize-none rounded-lg border border-white/70 bg-black p-2 text-white max-w-[50vw]"
						placeholder="Add title!"
					/>
					<textarea
						className="h-16 w-full resize-none rounded-lg border border-white/70 bg-black p-2 text-white max-w-[50vw]"
						placeholder="Add a description!"
					/>
					<div className="flex gap-2">
						<input
							ref={tagRef}
							type="text"
							className="w-1/2 resize-none rounded-lg border border-white/70 bg-black p-2 text-white max-w-[50vw]"
							placeholder="Add tag"
						/>
						<button
							type="submit"
							onClick={handleAddTag}
							className="border border-white/70 bg-black p-2 hover:bg-white hover:text-black transition-colors rounded-lg"
						>
							+
						</button>
					</div>
					{/* Contendor de Tags */}
					<div className="flex gap-4 flex-wrap">
						{tags.map((tag) => {
							return (
								<span
									key={tag}
									className="rounded-lg border px-2 py-1 transition-colors hover:bg-white/90 hover:text-black"
								>
									{tag}
								</span>
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
