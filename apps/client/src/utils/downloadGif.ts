interface DownloadProps {
	url: string
	filename: string
}

export const downloadGif = async ({ url, filename }: DownloadProps) => {
	// Obtén el archivo desde la URL
	const resp = await fetch(url)
	const blob = await resp.blob() // Crea un Blob a partir de la respuesta

	// Crea una URL temporal para el Blob
	const href = window.URL.createObjectURL(blob)

	// Crea un enlace y simula un clic para descargarlo
	const link = document.createElement('a')
	link.href = href
	link.download = filename // Nombre del archivo cuando se descargue
	link.click() // Simula el clic para iniciar la descarga

	// Libera la URL temporal
	window.URL.revokeObjectURL(url)
}
