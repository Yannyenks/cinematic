import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitChars } from '../lib/splitChars'
import { useReducedMotion, useIsMobile } from '../lib/useReducedMotion'
import { useNearViewport } from '../lib/useNearViewport'

gsap.registerPlugin(ScrollTrigger)

export default function ScrubSection({
  id,
  index,
  total,
  eyebrow,
  title,
  videoSrc,
  transition = 'dissolve',
  last = false,
  eager = false,
  children,
}) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const titleRef = useRef(null)
  const bgRef = useRef(null)
  const sweepRef = useRef(null)
  const lastVideoTimeRef = useRef(-1)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const nearViewport = useNearViewport(sectionRef, '150% 0px')
  const near = eager || nearViewport

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const ctx = gsap.context(() => {
      const chars = splitChars(titleRef.current)
      gsap.set(chars, { rotateX: -90, opacity: 0, filter: 'blur(6px)', transformOrigin: '50% 100%' })

      if (reduced) {
        gsap.set(chars, { rotateX: 0, opacity: 1, filter: 'blur(0px)' })
        return
      }

      const titleTl = gsap.timeline({ paused: true })
      titleTl.to(chars, {
        rotateX: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.03,
        ease: 'power3.out',
      })

      let scrollTween

      if (!isMobile) {
        scrollTween = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=' + Math.round(window.innerHeight * 1.6),
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress

            if (video && video.duration) {
              const targetTime = p * video.duration
              // The clip is encoded at 24fps (~0.042s/frame) -- seeking more
              // often than that just re-decodes a frame that looks identical,
              // so skip sets below one frame's worth of movement.
              if (Math.abs(targetTime - lastVideoTimeRef.current) >= 0.04) {
                video.currentTime = targetTime
                lastVideoTimeRef.current = targetTime
              }
            }

            titleTl.progress(Math.min(1, p / 0.22))

            if (sweepRef.current) {
              const sweepDuration = 0.3
              const sweepP = Math.min(1, p / sweepDuration)
              sweepRef.current.style.top = sweepP * 100 + '%'
              sweepRef.current.style.opacity = p <= 0 ? 0 : String(Math.sin(Math.PI * sweepP))
            }

            if (p > 0.82 && !last) {
              section.classList.add('is-exiting')
              const exitP = (p - 0.82) / 0.18
              if (bgRef.current) {
                bgRef.current.style.filter =
                  `brightness(${1 - exitP * 0.4}) saturate(${1 - exitP * 0.7}) ` +
                  `drop-shadow(${exitP * 5}px 0 0 rgba(255,45,85,.4)) ` +
                  `drop-shadow(${-exitP * 5}px 0 0 rgba(0,220,255,.4))`
              }
              if (titleRef.current) {
                titleRef.current.style.opacity = String(1 - exitP)
                titleRef.current.style.transform = `translateX(${Math.sin(p * 300) * exitP * 10}px)`
              }
            } else {
              section.classList.remove('is-exiting')
              if (bgRef.current) bgRef.current.style.filter = ''
              if (titleRef.current) {
                titleRef.current.style.opacity = '1'
                titleRef.current.style.transform = 'translateX(0)'
              }
            }
          },
        })
      } else {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          onEnter: () => titleTl.play(),
          onEnterBack: () => titleTl.play(),
        })
      }

      return () => {
        if (scrollTween) scrollTween.kill()
      }
    }, section)

    return () => ctx.revert()
  }, [reduced, isMobile])

  useEffect(() => {
    if (near && videoRef.current) videoRef.current.load()
  }, [near])

  return (
    <section
      id={id}
      className={`section section--${transition}`}
      ref={sectionRef}
      data-transition={transition}
    >
      <div className="section__bg" ref={bgRef}>
        {videoSrc && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload={eager ? 'auto' : 'none'}
            poster={videoSrc.replace(/\.(webm|mp4)$/, '.jpg')}
          >
            {near && <source src={videoSrc} />}
          </video>
        )}
        <div className="section__sweep" ref={sweepRef} aria-hidden="true" />
      </div>
      <div className="section__scrim" />
      <div className="section__vignette" />
      <div className="section__index mono">
        {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
      <div className="section__inner">
        <div className="section__eyebrow">{eyebrow}</div>
        <h2 className="section__title" ref={titleRef}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
