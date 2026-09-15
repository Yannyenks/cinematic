import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import ScanGauge from './components/ScanGauge'
import HUDOverlay from './components/HUDOverlay'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'
import DataSection from './sections/DataSection'
import Signature from './sections/Signature'
import { sections } from './data/sections'

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
      <CustomCursor />
      <HUDOverlay />
      <ScanGauge />
      <main className="site">
        <Hero />
        {sections.map((data, i) => (
          <DataSection key={data.id} data={data} index={i + 2} total={total} />
        ))}
        <Signature />
      </main>
    </>
  )
}
