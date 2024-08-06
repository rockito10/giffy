import { useMe } from "../../hooks/useMe"

export function DeleteComment() {
  const { username } = useMe()

  const handleDelete = () => {}

  return (
    <button
      className="flex items-center justify-center rounded border bg-black px-2 py-1 transition-colors hover:bg-white hover:text-black"
      title="Delete comment"
      onClick={handleDelete}
    >
      Remove
    </button>
  )
}
