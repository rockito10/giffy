import { Header } from "../components/Header"

interface Props {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div>
      <div className="sticky top-0 z-[100]">
        <Header />
      </div>
      <main className="p-8">{children}</main>
      {/* <footer>FOOTER</footer> */}
    </div>
  )
}
