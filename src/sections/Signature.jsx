import ScrubSection from '../components/ScrubSection'

export default function Signature() {
  return (
    <ScrubSection
      id="signature"
      index={8}
      total={8}
      eyebrow="Scan complet"
      title="LAND CRUISER"
      keyword="100%"
      videoSrc="/video/signature.mp4"
      transition="converge"
      last
    >
      <p className="section__lead">
        Toutes les couches relevées. Le véhicule se reconstitue, intact — prêt pour le terrain
        qu’il vient de révéler.
      </p>
      <div className="section__lead" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a className="cta" href="#" style={{ gridColumn: 'unset' }}>Configurer</a>
        <a className="cta" href="#" style={{ gridColumn: 'unset' }}>Réserver un essai</a>
      </div>
    </ScrubSection>
  )
}
