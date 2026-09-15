import { useEffect, useRef } from 'react'

export default function ScanGauge() {
  const fillRef = useRef(null)
  const markerRef = useRef(null)
  const pctRef = useRef(null)

  useEffect(() => {
    let raf = null

    const update = () => {
      raf = null
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0

      if (fillRef.current) fillRef.current.style.height = pct + '%'
      if (markerRef.current) markerRef.current.style.bottom = pct + '%'
      if (pctRef.current) pctRef.current.textContent = String(Math.round(pct)).padStart(3, '0')
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scan-gauge" aria-hidden="true">
      <div className="scan-gauge__label">SCAN DEPTH</div>
      <div className="scan-gauge__track">
        <div className="scan-gauge__fill" ref={fillRef} />
        <div className="scan-gauge__marker" ref={markerRef} />
      </div>
      <div className="scan-gauge__pct mono" ref={pctRef}>000</div>
    </div>
  )
}
