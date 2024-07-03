interface Props {
  id: string
  alt: string
  src: string
}

export function Frame({ id, alt, src }: Props) {
  return (
    <a key={id} href={`gif/${id}`}>
      <img alt={alt} className="mt-2.5 transition-transform hover:scale-110" src={src} />
    </a>
  )
}
