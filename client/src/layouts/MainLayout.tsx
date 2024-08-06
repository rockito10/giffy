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
      <footer className="h-96 border">
        <p>
          Con 34 años, en 1812, tras haber alcanzado el grado de teniente coronel, y luego de una
          escala en Londres, retornó a Buenos Aires, donde se puso al servicio de la independencia
          de las Provincias Unidas del Río de la Plata.10​Se le encomendó la creación del Regimiento
          de Granaderos a Caballo (que hoy lleva su nombre), que tuvo su bautismo de fuego en el
          combate de San Lorenzo.11​Se le encargó la jefatura del Ejército del Norte, en reemplazo
          del general Manuel Belgrano.12​ Allí concibió su plan continental, comprendiendo que el
          triunfo patriota en la guerra de la independencia hispanoamericana solo se lograría con la
          eliminación de todos los núcleos realistas que eran los centros de poder leales a mantener
          el sistema colonial en América.13​
        </p>
      </footer>
    </div>
  )
}
