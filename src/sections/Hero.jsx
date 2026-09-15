import ScrubSection from '../components/ScrubSection'

export default function Hero() {
  return (
    <ScrubSection
      id="hero"
      index={1}
      total={8}
      eyebrow="Scan initialisé"
      title="ANATOMY"
      keyword="SCAN"
      videoSrc="/video/hero.mp4"
      transition="dissolve"
    >
      <p className="section__lead">
        Land Cruiser. Décelé couche par couche — carrosserie, châssis, groupe motopropulseur,
        transmission, habitacle. Ce que la brochure ne montre pas.
      </p>
      <div className="section__lead mono" style={{ fontSize: '0.75rem', color: 'var(--c-scan)', letterSpacing: '0.1em' }}>
        ↓ SCROLLEZ POUR ENGAGER LE SCAN
      </div>
    </ScrubSection>
  )
}
