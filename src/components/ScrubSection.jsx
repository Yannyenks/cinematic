import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitChars } from '../lib/splitChars'
import { useReducedMotion, useIsMobile } from '../lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function ScrubSection({
  id,
  index,
  total,
  eyebrow,
  title,
  keyword,
  videoSrc,
  transition = 'dissolve',
  last = false,
  children,
}) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const titleRef = useRef(null)
  const keywordRef = useRef(null)
  const bgRef = useRef(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

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
              video.currentTime = p * video.duration
            }

            titleTl.progress(Math.min(1, p / 0.22))

            if (keywordRef.current) {
              keywordRef.current.style.transform = `translateY(${(0.5 - p) * 40}px)`
            }

            if (p > 0.82 && !last) {
              section.classList.add('is-exiting')
              const exitP = (p - 0.82) / 0.18
              if (bgRef.current) {
                bgRef.current.style.filter = `brightness(${1 - exitP * 0.5}) saturate(${1 - exitP})`
              }
              if (titleRef.current) {
                titleRef.current.style.opacity = String(1 - exitP)
                titleRef.current.style.transform = `translateX(${exitP * (Math.random() > 0.5 ? 12 : -12)}px)`
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
            preload="metadata"
            poster={videoSrc.replace(/\.(webm|mp4)$/, '.jpg')}
          >
            <source src={videoSrc} />
          </video>
        )}
      </div>
      <div className="section__scrim" />
      <div className="section__keyword" ref={keywordRef} aria-hidden="true">
        {keyword}
      </div>
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
