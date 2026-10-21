import { sx, type Vals } from '../lib/view'

export function BookingBar({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "6", background: "#FFFFFF", borderTop: "1px solid #EFEFF2", padding: "12px 20px max(30px,var(--sab))", display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ flex: "1" }}>
        <p style={{ margin: "0", fontSize: "20px", fontWeight: "800", color: "#4700D8", lineHeight: "1" }}>{v.bottomPrice}</p>
        <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{v.bottomSub}</p>
      </div>
      <button onClick={v.bookingNext} style={sx(`height:52px;padding:0 32px;border-radius:28px;border:none;color:#FFFFFF;font-weight:700;font-size:16px;cursor:pointer;background:#4700D8;opacity:${v.nextOpacity ?? ""};box-shadow:0 6px 24px rgba(71,0,216,.28);transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
        {v.nextLabel}
      </button>
    </div>
  )
}
