import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScanGauge() {
  const fillRef = useRef(null)
  const markerRef = useRef(null)
  const pctRef = useRef(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const pct = self.progress * 100
        if (fillRef.current) fillRef.current.style.height = pct + '%'
        if (markerRef.current) markerRef.current.style.bottom = pct + '%'
        if (pctRef.current) pctRef.current.textContent = String(Math.round(pct)).padStart(3, '0')
      },
    })

    return () => st.kill()
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
