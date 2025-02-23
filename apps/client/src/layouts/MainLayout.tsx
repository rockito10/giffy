import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

interface Props {
	children: React.ReactNode
}

export function MainLayout({ children }: Props) {
	return (
		<div className="grid h-dvh grid-rows-[auto,1fr,auto]">
			<Header className="sticky top-0 z-[100]" />
			<main className="flex-grow p-8">{children}</main>
			<Footer />
		</div>
	)
}
