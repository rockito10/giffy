interface CopyImageProps extends React.SVGProps<SVGSVGElement> {}

export function CopyImage({ ...props }: CopyImageProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="12"
			viewBox="-12 -6 48 24"
			{...props}
		>
			<title>Copy</title>
			<g fill="currentColor" fillRule="nonzero">
				<path d="M19.031 0H16s1.625 1.063 1.975 3H19.031C20.131 3 21 3.869 21 4.969v2C21 8.069 20.131 9 19.031 9h-7C10.931 9 10 8.069 10 6.969V5H7v1.969c0 .718.156 1.406.431 2.031.788 1.762 2.557 3 4.6 3h7C21.794 12 24 9.731 24 6.969v-2A4.945 4.945 0 0 0 19.031 0z" />
				<path d="M16.6 3a4.946 4.946 0 0 0-4.569-3h-7C2.27 0 0 2.206 0 4.969v2C0 9.73 2.269 12 5.031 12H8s-1.612-1.063-2.006-3H5.03C3.931 9 3 8.069 3 6.969v-2C3 3.869 3.931 3 5.031 3h7C13.131 3 14 3.869 14 4.969V7h3V4.969c0-.7-.144-1.369-.4-1.969z" />
			</g>
		</svg>
	)
}
