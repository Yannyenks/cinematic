import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import ScanGauge from './components/ScanGauge'
import HUDOverlay from './components/HUDOverlay'
import CustomCursor from './components/CustomCursor'
import SectionNav from './components/SectionNav'
import Grain from './components/Grain'
import Hero from './sections/Hero'
import DataSection from './sections/DataSection'
import Signature from './sections/Signature'
import { sections } from './data/sections'

const navItems = [
  { id: 'hero', label: 'SCAN' },
  ...sections.map((s) => ({ id: s.id, label: s.title })),
  { id: 'signature', label: '100%' },
]

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = loaded ? '' : 'hidden'
    if (loaded) {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
  }, [loaded])

  const total = sections.length + 2

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Grain />
      <CustomCursor />
      <HUDOverlay />
      <ScanGauge />
      <SectionNav items={navItems} />
      <main className="site">
        <Hero total={total} />
        {sections.map((data, i) => (
          <DataSection key={data.id} data={data} index={i + 2} total={total} />
        ))}
        <Signature total={total} />
      </main>
    </>
  )
}
