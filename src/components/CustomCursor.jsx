import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ref = useRef(null)
  const coordsRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (coordsRef.current) {
        coordsRef.current.textContent = `X:${String(e.clientX).padStart(4, '0')} Y:${String(e.clientY).padStart(4, '0')}`
      }
    }

    const onOver = (e) => {
      if (!ref.current) return
      ref.current.classList.toggle('is-hovering', Boolean(e.target.closest('a, button, [data-cursor-hover]')))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    let raf
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2
      pos.current.y += (target.current.y - pos.current.y) * 0.2
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <div className="cursor__ring" />
      <div className="cursor__h" />
      <div className="cursor__v" />
      <div className="cursor__coords mono" ref={coordsRef} />
    </div>
  )
}
