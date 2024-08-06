interface Props {
  name: string
  src: string
}

export function Avatar({ name, src }: Props) {
  return (
    <div className="flex flex-col">
      <img
        alt={`Avatar of ${name}`}
        className="h-14 w-14 rounded-full border-2 object-cover"
        src={src ?? "/assets/no-avatar.svg"}
        title={name}
      />
    </div>
  )
}
