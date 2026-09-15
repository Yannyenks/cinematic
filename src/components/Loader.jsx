import { useEffect, useRef, useState } from 'react'

const STATUS_LINES = [
  'INITIALISATION DES CAPTEURS',
  'CALIBRAGE OPTIQUE',
  'CHARGEMENT DES TEXTURES',
  'SYNCHRONISATION DU SCROLL',
  'SCAN PRÊT',
]

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [status, setStatus] = useState(STATUS_LINES[0])
  const fillRef = useRef(null)

  useEffect(() => {
    let raf
    let progress = 0
    const start = performance.now()
    const minDuration = 1400

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()
    let fontsDone = false
    fontsReady.then(() => {
      fontsDone = true
    })

    const tick = (now) => {
      const elapsed = now - start
      const timeBased = Math.min(1, elapsed / minDuration)
      progress = fontsDone ? Math.max(timeBased, 0.6) : timeBased * 0.85

      const displayPct = Math.round(progress * 100)
      setPct(displayPct)
      if (fillRef.current) fillRef.current.style.width = displayPct + '%'

      const lineIndex = Math.min(
        STATUS_LINES.length - 1,
        Math.floor((displayPct / 100) * STATUS_LINES.length)
      )
      setStatus(STATUS_LINES[lineIndex])

      if (progress >= 1 && fontsDone && elapsed >= minDuration) {
        setPct(100)
        setStatus(STATUS_LINES[STATUS_LINES.length - 1])
        if (fillRef.current) fillRef.current.style.width = '100%'
        setTimeout(() => {
          setHidden(true)
          setTimeout(onDone, 600)
        }, 200)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div className="loader" style={{ opacity: hidden ? 0 : 1 }} aria-hidden={hidden}>
      <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--c-scan)', letterSpacing: '0.2em' }}>
        LAND CRUISER — ANATOMY
      </div>
      <div className="loader__bar">
        <div className="loader__fill" ref={fillRef} />
      </div>
      <div className="loader__pct">{String(pct).padStart(3, '0')}%</div>
      <div className="loader__status mono">{status}</div>
    </div>
  )
}
