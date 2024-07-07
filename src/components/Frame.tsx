interface Props {
  alt: string
  id: string
  src: string
}

export function Frame({ alt, id, src }: Props) {
  return (
    <a key={id} href={`gif/${id}`}>
      <img alt={alt} className="mt-2.5 rounded-md transition-transform hover:scale-110" src={src} />
    </a>
  )
}
