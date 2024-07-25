import { Form } from "../components/Form"

interface Props {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className="p-8">
      <header>
        <Form />
      </header>
      <main>{children}</main>
      {/* <footer>FOOTER</footer> */}
    </div>
  )
}
