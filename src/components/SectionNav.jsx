import { useEffect, useRef, useState } from 'react'

export default function SectionNav({ items }) {
  const [active, setActive] = useState(items[0]?.id)
  const refs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="section-nav" aria-label="Navigation des sections">
      {items.map(({ id, label }) => (
        <button
          key={id}
          ref={(el) => (refs.current[id] = el)}
          className={`section-nav__item${active === id ? ' active' : ''}`}
          data-cursor-hover
          aria-label={label}
          aria-current={active === id ? 'true' : undefined}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <span className="section-nav__label mono">{label}</span>
          <span className="section-nav__dot" />
        </button>
      ))}
    </nav>
  )
}
