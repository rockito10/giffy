import type { MappedGif, GifComments } from "../types/types"

import { Link, useParams } from "wouter"

import { LikeButton } from "../components/LikeButton"
import { useFetch } from "../hooks/useFetch"
import { getGifDetails } from "../services/getGifDetails"
import { getComments } from "../services/getComments"
import CommentSection from "../components/CommentSection"

export default function GifsDetails() {
  const { id } = useParams()

  // Get Gif Details (Tenor)
  const { data, isLoading, error } = useFetch<MappedGif>({
    service: () => getGifDetails({ id }),
  })

  console.log({ data }, "PEPE", { id })

  // Get Comments (GiffyDb)
  const { data: AllComments } = useFetch<GifComments>({
    service: () => getComments(id),
  })

  if (error) return <div>Error: {error}</div>

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>No data</div>

  return (
    <div className="flex gap-8 flex-col">
      <div className="flex gap-8">
        
        {/* --- GIF --- */}
        <div className="flex w-1/3 flex-shrink-0 flex-col gap-y-4">


          <h1 className="text-4xl">Your GIF: {data.alt}</h1>
          <img
            alt="gif"
            className="w-full rounded-md border-4 border-double"
            src={`${data?.images?.gif}`}
          />
        </div>

        <section className="flex flex-col justify-center gap-8">
          {/* --- TAGS --- */}
          <div className="flex justify-center gap-x-4 text-xl items-center">
            <span>TAGS: </span>

            {data?.tags.map((tag) => (
              <Link
                key={tag}
                className="rounded-lg border px-2 py-1 transition-colors hover:bg-white/90 hover:text-black"
                to="#"
              >
                {tag}
              </Link>
            ))}
          </div>

          <span>Share: Facebook | Twitter | Instagram</span>

          <LikeButton />
        </section>

        {/*  */}
      </div>

      {/* ... */}

      <div>
        <CommentSection comments={AllComments} />
      </div>
    </div>
  )
}

{
  /* <div className="flex gap-4">
          {["Instagram", "Twitter", "Facebook"].map((tag) => (
            <button className="rounded-lg border px-2 py-1 transition-colors hover:bg-white/90 hover:text-black">
              {tag}
            </button>
          ))}
        </div> */
}
