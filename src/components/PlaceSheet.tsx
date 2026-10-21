import { list, sx, txt, type Vals } from '../lib/view'

export function PlaceSheet({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "20" }}>
      <div onClick={v.closePlace} style={{ position: "absolute", inset: "0", background: "rgba(15,15,18,.55)", animation: "fade .3s ease" }} />
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "12px 20px max(34px,var(--sab))", animation: "up .42s cubic-bezier(.22,1,.36,1)", maxHeight: "82%", display: "flex", flexDirection: "column" }}>
        <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "#E3E3E7", margin: "0 auto 16px", flex: "none" }} />
        <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.01em" }}>Elige una ubicación</h3>
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#56565F" }}>Verás los servicios disponibles en esa zona de Chile.</p>
        <div style={{ flex: "1", minHeight: "0", overflowY: "auto", scrollbarWidth: "none", margin: "0 -20px", padding: "0 20px" }}>
          <button onClick={v.placeUseMine} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px", marginBottom: "20px", borderRadius: "14px", border: "1px solid #E3E3E7", background: "#FFFFFF", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
            <span style={{ width: "36px", height: "36px", flex: "none", borderRadius: "100px", background: "#F4EEFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </span>
            <span style={{ flex: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F0F12" }}>Usar mi ubicación actual</span>
              <span style={{ display: "block", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>Vitacura, Región Metropolitana</span>
            </span>
          </button>
          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#7E7E87" }}>
            Región
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
            {list(v.placeRegions).map((r: any, $i: number) => (
              <button key={$i} onClick={r?.onClick} style={sx(`display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;text-align:left;cursor:pointer;background:${r?.bg ?? ""};border:${r?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                <span style={{ flex: "1", fontSize: "14px", fontWeight: "700", color: "#0F0F12" }}>{r?.name}</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#7E7E87" }}>{r?.count}</span>
                <span style={sx(`width:20px;height:20px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:11px;font-weight:800;background:${r?.checkBg ?? ""};border:${r?.checkBorder ?? ""}`)}>
                  {r?.check}
                </span>
              </button>
            ))}
          </div>
          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#7E7E87" }}>
            Comuna
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
            {list(v.placeComunas).map((c: any, $i: number) => (
              <button key={$i} onClick={c?.onClick} style={sx(`height:36px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                {c?.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={v.applyPlace} style={{ flex: "none", width: "100%", height: "52px", marginTop: "16px", borderRadius: "100px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
          {"Ver servicios en "}{txt(v.placeDraftName)}
        </button>
      </div>
    </div>
  )
}
