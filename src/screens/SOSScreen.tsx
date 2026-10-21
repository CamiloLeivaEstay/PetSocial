import type { Vals } from '../lib/view'

export function SOSScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="SOS" style={{ minHeight: "100%", background: "#B91C1C", color: "#FFFFFF", padding: "16px 20px 40px", display: "flex", flexDirection: "column", gap: "20px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <button onClick={v.back} style={{ alignSelf: "flex-start", height: "36px", padding: "0 14px", borderRadius: "100px", border: "none", background: "rgba(255,255,255,.18)", color: "#FFFFFF", fontWeight: "700", fontSize: "13px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
        Cancelar
      </button>
      <div>
        <p style={{ margin: "0 0 6px", fontSize: "10px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", opacity: ".8" }}>
          {v.sosLabel}
        </p>
        <h1 style={{ margin: "0", fontSize: "30px", fontWeight: "800", letterSpacing: "-0.03em", lineHeight: "1.15" }}>{v.sosTitle}</h1>
      </div>
      <div style={{ background: "#FFFFFF", color: "#0F0F12", borderRadius: "20px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=200&q=80" alt="" style={{ width: "52px", height: "52px", borderRadius: "14px", objectFit: "cover" }} />
          <div>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>{v.sosPlace}</p>
            <p style={{ margin: "0", fontSize: "12px", color: "#56565F" }}>{v.sosMeta}</p>
          </div>
        </div>
        <button style={{ height: "52px", borderRadius: "28px", border: "none", background: "#DC2626", color: "#FFFFFF", fontWeight: "800", fontSize: "16px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          {v.sosCta}
        </button>
      </div>
      <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.6", opacity: ".9" }}>{v.sosNote}</p>
    </div>
  )
}
