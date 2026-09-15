import { useEffect, useState } from 'react'

// Becomes true once the element is within `margin` of the viewport, and stays
// true afterwards -- used to defer fetching a section's video until the
// visitor is about to scroll to it, instead of loading all sections at once.
export function useNearViewport(ref, margin = '100% 0px') {
  const [near, setNear] = useState(false)

  useEffect(() => {
    if (near || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: margin }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, margin, near])

  return near
}
