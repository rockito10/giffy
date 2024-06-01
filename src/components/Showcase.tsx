import { useGifs } from "../hooks/useGifs"
import { Form } from "./Form"
import { Grid } from "./Grid"

export function Showcase() {
  const { data, setQuery } = useGifs()

  return (
    <>
      <div>
        <Form setQuery={setQuery} />
        <Grid data={data} />
      </div>
    </>
  )
}
