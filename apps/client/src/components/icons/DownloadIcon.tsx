interface DownloadIconProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DownloadIcon({ children, ...props }: DownloadIconProps) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#fff"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<title>Download</title>
			<path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
		</svg>
	)
}
