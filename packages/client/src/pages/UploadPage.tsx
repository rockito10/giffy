export default function UploadPage() {
	const reader = new FileReader()

	// reader.addEventListener("")

	return (
		<div>
			<h2>UploadPage</h2>
			<div className="flex gap-9">
				{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
				<div className="size-1/2 md:size-1/3 aspect-square dashed-border"></div>

				<textarea
					className="h-16 w-full resize-none rounded-lg border border-white/70 bg-black p-2 text-white max-w-[50vw]"
					placeholder="Add a description!"
				/>
			</div>
		</div>
	)
}
