import ScrubSection from '../components/ScrubSection'

export default function Signature({ total }) {
  return (
    <ScrubSection
      id="signature"
      index={total}
      total={total}
      eyebrow="Scan complet"
      title="LAND CRUISER"
      keyword="100%"
      videoSrc="/video/hero-alt.mp4"
      transition="converge"
      last
    >
      <p className="section__lead">
        Châssis, moteur — toutes les couches relevées. Le véhicule se reconstitue, intact,
        sous le même œil qui vient de le mettre à nu.
      </p>
      <div className="section__lead" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a className="cta" href="#" style={{ gridColumn: 'unset' }}>Configurer</a>
        <a className="cta" href="#" style={{ gridColumn: 'unset' }}>Réserver un essai</a>
      </div>
    </ScrubSection>
  )
}
