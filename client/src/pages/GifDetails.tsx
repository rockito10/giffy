import { Link, useParams } from "wouter"
import { CommentSection } from "../components/Comments/CommentSection"
import { useGetGifById } from "../hooks/useGetGifById"

export default function GifsDetails() {
  const { id: gifId } = useParams()
  const { data, isLoading, error } = useGetGifById(gifId as string)

  if (error)
    return (
      <div>
        {error.name} {error.message}
      </div>
    )

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

            {data?.tags?.map((tag) => (
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
        <CommentSection />
      </div>
    </div>
  )
}
