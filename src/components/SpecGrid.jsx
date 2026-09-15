import CountUp from './CountUp'

export default function SpecGrid({ specs, trigger }) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="section__specs">
      {specs.map((spec) => {
        const numeric = parseFloat(spec.value)
        const isNumeric = !Number.isNaN(numeric) && String(numeric) === spec.value.replace(',', '.')

        return (
          <div className={`spec${spec.thermal ? ' spec--thermal' : ''}`} key={spec.label}>
            <div className="spec__label">{spec.label}</div>
            <div className="spec__value">
              {isNumeric ? (
                <CountUp value={numeric} trigger={trigger} />
              ) : (
                <span className="mono">{spec.value}</span>
              )}
              {spec.unit && <span className="unit">{spec.unit}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
