import { useEffect, useRef, useState } from "react"

export function useInView() {
  const [inView, setInView] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries
    setInView(entry.isIntersecting)
  })

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref.current])

  return { inView, ref }
}
