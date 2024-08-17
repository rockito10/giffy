import type { MappedGif } from "../types/types"

import { Link, useParams } from "wouter"

import { CommentSection } from "../components/Comments/CommentSection"
import { LikeButton } from "../components/LikeButton"
import { useFetch } from "../hooks/useFetch"
import type { LikesResponse } from "../types/response"
import { useQuery } from "@tanstack/react-query"

const fetchGifById = (id: string) => fetch(`/api/search/gif/${id}`).then((res) => res.json())

export default function GifsDetails() {
  const { id } = useParams()

  // Get Gif Details (Tenor)
  // const { data, isLoading, error } = useFetch<MappedGif>(`/api/search/gif/${id}`)

  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: [id],
    queryFn: () => fetchGifById(id as string),
  })

  // const { data: likesInfo } = useFetch<LikesResponse>(`/api/likes/${id}`)

  if (error) return <div>Error: {error.message}</div>

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>No data</div>

  return (
    <div className="flex flex-col gap-8">
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
          <div className="flex items-center justify-center gap-x-4 text-xl">
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

          {/* <LikeButton gifId={id} likesInfo={likesInfo} /> */}
        </section>

        {/*  */}
      </div>

      {/* ... */}

      <div>
        <CommentSection gifId={id} />
      </div>
    </div>
  )
}
