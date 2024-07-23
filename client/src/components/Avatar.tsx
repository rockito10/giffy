interface Props {
  name: string
  src: string
}

export default function Avatar({ name, src }: Props) {
  return (
    <div className="flex flex-col">
      <img
        alt={`Avatar of ${name}`}
        className="h-16 w-16 rounded-full border-2 object-cover"
        src={src ?? "/assets/no-avatar.svg"}
        title={name}
      />
      <h3>{name}</h3>
    </div>
  )
}
