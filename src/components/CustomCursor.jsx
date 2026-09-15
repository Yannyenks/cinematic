import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ref = useRef(null)
  const coordsRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
      if (coordsRef.current) {
        coordsRef.current.textContent = `X:${String(e.clientX).padStart(4, '0')} Y:${String(e.clientY).padStart(4, '0')}`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <div className="cursor__h" />
      <div className="cursor__v" />
      <div className="cursor__coords mono" ref={coordsRef} />
    </div>
  )
}
