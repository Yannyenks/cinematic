import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Callout({ top, left, label, value, flip = false }) {
  const rootRef = useRef(null)
  const lineRef = useRef(null)
  const labelRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleX: 0 })
      gsap.set(labelRef.current, { opacity: 0, x: flip ? -8 : 8 })
      gsap.set(dotRef.current, { scale: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(dotRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' })
        .to(lineRef.current, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, '-=0.05')
        .to(labelRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }, '-=0.15')
    }, rootRef)

    return () => ctx.revert()
  }, [flip])

  return (
    <div
      className="callout"
      ref={rootRef}
      style={{
        top,
        left: flip ? 'auto' : left,
        right: flip ? left : 'auto',
        flexDirection: flip ? 'row-reverse' : 'row',
      }}
    >
      <div className="callout__dot" ref={dotRef} />
      <div className="callout__line" ref={lineRef} style={{ transformOrigin: flip ? 'right center' : 'left center' }} />
      <div className="callout__label mono" ref={labelRef}>
        {label}
        {value && <span className="value">{value}</span>}
      </div>
    </div>
  )
}
