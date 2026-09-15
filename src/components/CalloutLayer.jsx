import Callout from './Callout'

export default function CalloutLayer({ callouts }) {
  if (!callouts || callouts.length === 0) return null

  return (
    <>
      {callouts.map((c) => (
        <Callout key={c.label} top={c.top} left={c.left} label={c.label} value={c.value} flip={c.flip} />
      ))}
    </>
  )
}
