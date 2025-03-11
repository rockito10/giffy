import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

interface Props {
	children: React.ReactNode
}

export function MainLayout({ children }: Props) {
	return (
		// <div className="grid h-dvh grid-rows-[auto,1fr,auto] sticky inset-0 z-10">
		<>
			<Header className="sticky top-0 left-0 z-10" />

			<main className="flex-grow p-4 md:p-8 min-w-[320px]">{children}</main>
			<Footer />
		</>
		// </div>
	)
}
