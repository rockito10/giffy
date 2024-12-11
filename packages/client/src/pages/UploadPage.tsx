import { useState } from 'react'

export default function UploadPage() {
	const reader = new FileReader()
	const [src, setSrc] = useState('')

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

	return (
		<div>
			<div className="flex gap-9">
				<div className="relative size-1/2 md:size-1/3 border">
					<div
						className="size-1/2 md:size-1/3 aspect-square dashed-border"
						onDrop={handleOnDrop}
						onDragOver={handleOnDragOver}
					/>
					<img src={src} alt={'imagen'} className="absolute top-0 left-0 size-1/2 md:size-1/3" />
				</div>
				<textarea
					className="h-16 w-full resize-none rounded-lg border border-white/70 bg-black p-2 text-white max-w-[50vw]"
					placeholder="Add a description!"
				/>
			</div>
		</div>
	)
}
