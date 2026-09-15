import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CountUp({ value, decimals = 0, trigger }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.4,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => {
        el.textContent = obj.v.toFixed(decimals)
      },
    })

    const st = ScrollTrigger.create({
      trigger: trigger || el,
      start: 'top 85%',
      onEnter: () => tween.play(),
    })

    return () => {
      st.kill()
      tween.kill()
    }
  }, [value, decimals, trigger])

  return <span className="mono" ref={ref}>0</span>
}
