import { list, sx, txt, type Vals } from '../lib/view'

export function ExploreScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Explorar · Mapa" style={{ position: "absolute", top: "var(--sb)", left: "0", right: "0", bottom: "0", overflow: "hidden", background: "#E8EDF2", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ position: "absolute", left: "0", right: "0", top: "40%", height: "22px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", left: "0", right: "0", top: "63%", height: "14px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", left: "0", right: "0", top: "19%", height: "9px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", top: "0", bottom: "0", left: "30%", width: "20px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", top: "0", bottom: "0", left: "60%", width: "14px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", left: "66%", top: "8%", width: "26%", height: "9%", borderRadius: "14px", background: "#DDEBDD" }} />
      <div style={{ position: "absolute", left: "6%", top: "45%", width: "20%", height: "14%", borderRadius: "14px", background: "#DDEBDD" }} />
      {v.locGranted ? (
        <div style={{ position: "absolute", left: "44%", top: "38%", zIndex: "1", width: "64px", height: "64px", margin: "-32px 0 0 -32px", borderRadius: "100px", background: "rgba(71,0,216,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ width: "18px", height: "18px", borderRadius: "100px", background: "#4700D8", border: "3px solid #FFFFFF", boxShadow: "0 2px 8px rgba(71,0,216,.4)" }} />
        </div>
      ) : null}
      {list(v.pins).map((p: any, $i: number) => (
        <button key={$i} onClick={p?.onClick} style={sx(`position:absolute;left:${p?.x ?? ""};top:${p?.y ?? ""};z-index:${p?.z ?? ""};display:flex;flex-direction:column;align-items:center;gap:1px;padding:7px 10px;border-radius:14px 14px 14px 2px;cursor:pointer;transition:transform .15s;background:${p?.bg ?? ""};border:${p?.border ?? ""};box-shadow:0 4px 16px rgba(15,15,18,0.08)`)} className="hover-7 tap-96">
          <span style={sx(`font-size:11px;font-weight:800;color:${p?.priceColor ?? ""}`)}>{p?.price}</span>
          <span style={sx(`font-size:9px;font-weight:500;white-space:nowrap;color:${p?.nameColor ?? ""}`)}>{p?.short}</span>
        </button>
      ))}
      <div style={{ position: "absolute", left: "0", right: "0", top: "0", padding: "8px 20px 0", display: "flex", flexDirection: "column", gap: "10px", zIndex: "4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={v.goHome} style={{ width: "36px", height: "36px", flex: "none", borderRadius: "36px", background: "#F9FAFB", border: "0.719px solid #EAECEB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34343D" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div style={{ flex: "1", display: "flex", alignItems: "center", gap: "10px", height: "48px", padding: "0 16px", borderRadius: "50px", background: "#F9FAFB", border: "1.438px solid #EAECEB", boxShadow: "0 1px 3px rgba(15,15,18,0.06)" }}>
            <button onClick={v.openPlace} title="Elegir región y comuna" style={{ width: "32px", height: "32px", flex: "none", marginLeft: "-8px", borderRadius: "100px", border: "none", background: "#E5DAFB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-4 tap-96">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </button>
            <span style={{ width: "1px", height: "20px", flex: "none", background: "#EAECEB", marginLeft: "-2px" }} />
            <input value={v.query ?? ""} onChange={v.onQuery} placeholder={v.mapPh} style={{ flex: "1", minWidth: "0", border: "none", background: "transparent", outline: "none", fontSize: "14px", fontWeight: "500", color: "#0F0F12" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", margin: "0 -20px", padding: "0 20px 4px" }}>
          {list(v.mapCats).map((c: any, $i: number) => (
            <button key={$i} onClick={c?.onClick} style={sx(`flex:none;height:38px;padding:0 18px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;border:none;background:${c?.bg ?? ""};color:${c?.color ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
              {c?.label}
            </button>
          ))}
        </div>
      </div>
      <button style={sx(`position:absolute;right:16px;bottom:${v.compassBottom ?? ""};z-index:4;width:40px;height:40px;border-radius:100px;background:#FFFFFF;border:1px solid #EFEFF2;box-shadow:0 4px 16px rgba(15,15,18,0.08);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      </button>
      {v.mapCard ? (
        <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "98px", zIndex: "5", background: "#FFFFFF", border: "0.719px solid #EAECEB", borderRadius: "24px", boxShadow: "0 8px 28px rgba(0,38,43,0.13)", animation: "fade .2s" }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
            <span style={{ width: "32px", height: "4px", borderRadius: "2px", background: "#D2D5D3" }} />
          </div>
          <div style={{ display: "flex", gap: "16px", padding: "8px 16px 16px" }}>
            <img src={v.mapCard?.cover} alt="" style={{ width: "96px", height: "96px", flex: "none", borderRadius: "20px", objectFit: "cover" }} />
            <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: "0", fontSize: "15px", fontWeight: "700", lineHeight: "22.5px", color: "#0D1514", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {v.mapCard?.name}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: "12px", lineHeight: "18px", color: "#7E7E87" }}>
                  {txt(v.mapCard?.comuna)}{" · "}{txt(v.mapCard?.km)}{" km"}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px" }}>
                  <span style={{ color: "#FFDC6E", fontSize: "12px" }}>★</span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#0D1514" }}>{v.mapCard?.rating}</span>
                  <span style={{ fontSize: "12px", color: "#7A8D8F" }}>({txt(v.mapCard?.reviews)})</span>
                </div>
              </div>
              <p style={{ margin: "0", fontSize: "18px", fontWeight: "800", lineHeight: "27px", color: "#00262B" }}>
                {txt(v.mapCard?.price)}{" "}
                <span style={{ fontSize: "12px", fontWeight: "500", color: "#7E7E87" }}>/{txt(v.mapCard?.unit)}</span>
              </p>
            </div>
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <button onClick={v.mapCard?.onClick} style={{ width: "100%", height: "42px", borderRadius: "20px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "14px", fontWeight: "700", letterSpacing: "-0.14px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
              Más información
            </button>
          </div>
        </div>
      ) : null}
      {v.mapEmpty ? (
        <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "98px", zIndex: "5", background: "#FFFFFF", borderRadius: "24px", padding: "20px", textAlign: "center", boxShadow: "0 8px 28px rgba(0,38,43,0.13)" }}>
          <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "800" }}>{"Sin servicios en "}{txt(v.placeName)}</p>
          <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87" }}>Prueba con otra comuna o categoría</p>
        </div>
      ) : null}
    </div>
  )
}
