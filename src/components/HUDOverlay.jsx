export default function HUDOverlay() {
  return (
    <div className="hud" aria-hidden="true">
      <div className="hud__corner hud__corner--tl" />
      <div className="hud__corner hud__corner--tr" />
      <div className="hud__corner hud__corner--bl" />
      <div className="hud__corner hud__corner--br" />
      <div className="hud__ticks hud__ticks--top" />
      <div className="hud__ticks hud__ticks--bottom" />
      <div className="hud__reticle">
        <div className="hud__reticle-pulse" />
      </div>
      <div className="hud__radar">
        <div className="hud__radar-sweep" />
      </div>
    </div>
  )
}
