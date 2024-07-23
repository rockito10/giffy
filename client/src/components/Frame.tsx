import { Link } from "wouter"

interface Props {
  alt: string
  id: string
  src: string
  className?: string
}

export function Frame({ alt, id, src, className }: Props) {
  return (
    <Link key={id} href={`/gif/${id}`}>
      <img
        alt={alt}
        className={`${className} rounded-md transition-transform hover:scale-110`}
        src={src}
      />
    </Link>
  )
}
