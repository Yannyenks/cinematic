import ScrubSection from '../components/ScrubSection'
import SpecGrid from '../components/SpecGrid'
import CalloutLayer from '../components/CalloutLayer'

export default function DataSection({ data, index, total }) {
  return (
    <ScrubSection
      id={data.id}
      index={index}
      total={total}
      eyebrow={data.eyebrow}
      title={data.title}
      videoSrc={data.video}
      transition={data.transition}
    >
      <p className="section__lead">{data.lead}</p>
      <SpecGrid specs={data.specs} />
      <CalloutLayer callouts={data.callouts} />
    </ScrubSection>
  )
}
