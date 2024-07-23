interface Props {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className="p-8">
      <header>HEADER</header>
      <main>{children}</main>
      <footer>FOOTER</footer>
    </div>
  )
}
