import { useState } from "react"

export function LikeButton() {
  const [nroLikes, setLikes] = useState(() => {
    const nroLikes = localStorage.getItem("likes")
    return nroLikes ? parseInt(nroLikes) : 0
  })

  const [isLiked, setIsLiked] = useState(false)

  function handleLike() {
    if (isLiked) {
      setLikes(nroLikes - 1)
      setIsLiked(false)
    } else {
      setLikes(nroLikes + 1)
      setIsLiked(true)
    }
  }

  return (
    <button
      className="w-fit rounded-md border border-red-950 px-2 py-1 text-red-600
                 transition-colors hover:bg-red-500 hover:text-black"
      onClick={handleLike}
    >
      Like {nroLikes}
    </button>
  )
}
