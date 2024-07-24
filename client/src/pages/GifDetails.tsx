import type { MappedGif } from "../types/types"

import { useParams } from "wouter"

import { LikeButton } from "../components/LikeButton"
import { useFetch } from "../hooks/useFetch"
import { getGifDetails } from "../services/getGifDetails"
import { getComments } from "../services/getComments"

export default function GifsDetails() {
  const { id } = useParams()

  // console.log(id)

  // Get Gif Details (Tenor)
  const { data, isLoading, error } = useFetch<MappedGif>({
    service: () => getGifDetails({ id }),
  })

  // Get Comments (GiffyDb)
  const { data: comments } = useFetch<MappedGif>({
    service: () => getComments(id),
  })

  // console.log("esta data", { data, isLoading, error })

  if (error) return <div>Error: {error}</div>

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>No data</div>

  console.log("comments", comments)

  return (
    <div>
      <div className="flex gap-8">
        <div className="flex w-1/3 flex-shrink-0 flex-col gap-y-4">
          <h1 className="text-4xl">Your GIF: {data.alt}</h1>
          <img
            alt="gif"
            className="w-full rounded-md border-4 border-double"
            src={`${data?.images?.gif}`}
          />
        </div>

        <div className="flex flex-col justify-center gap-4 text-xl">
          <h3>{data.alt}</h3>
          <span>Tags:</span>
          {/* <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button className="rounded-lg border px-2 py-1 transition-colors hover:bg-white/90 hover:text-black">
              {tag}
            </button>
          ))}
        </div> */}
          <br />
          <br />
          <span>Share:</span>
          {/* <div className="flex gap-4">
          {["Instagram", "Twitter", "Facebook"].map((tag) => (
            <button className="rounded-lg border px-2 py-1 transition-colors hover:bg-white/90 hover:text-black">
              {tag}
            </button>
          ))}
        </div> */}

          <LikeButton />

          <div>
            <h2>Comments</h2>
            <ul>
              {comments?.map(({id, comment}) => (
                <li key={id}>{comment}</li>
              ))}
            </ul>
          
          </div>

        </div>
      </div>
    </div>
  )
}
