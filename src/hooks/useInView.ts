import { useEffect, useRef, useState } from "react"

export function useInView({ root, rootMargin, threshold }: IntersectionObserverInit) {
  const [inView, setInView] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      setInView(entry.isIntersecting)
    },
    {
      root,
      rootMargin,
      threshold,
    },
  )

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref.current])

  return { inView, ref }
}
