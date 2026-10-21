import { list, sx, txt, type Vals } from '../lib/view'

export function SearchScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Buscador" style={{ paddingBottom: "40px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderBottom: "1px solid #EFEFF2" }}>
        <button onClick={v.back} style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div style={{ flex: "1", display: "flex", alignItems: "center", gap: "12px", height: "44px", padding: "0 16px", background: "#F7F7F9", borderRadius: "100px", border: "1.5px solid #F7F7F9" }} className="focus-within-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input autoFocus value={v.sq ?? ""} onChange={v.onSq} onKeyDown={v.onSqKey} placeholder="Buscar servicios..." style={{ flex: "1", minWidth: "0", border: "none", background: "transparent", outline: "none", fontSize: "14px", fontWeight: "500", color: "#0F0F12" }} />
          {v.sqHas ? (
            <button onClick={v.clearSq} style={{ width: "20px", height: "20px", flex: "none", borderRadius: "100px", border: "none", background: "#C9C9CF", color: "#FFFFFF", fontSize: "11px", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
              ✕
            </button>
          ) : null}
          <span style={{ width: "1px", height: "20px", flex: "none", background: "#E3E3E7" }} />
          <button onClick={v.goExplore} title="Ver en el mapa" style={{ width: "32px", height: "32px", flex: "none", marginRight: "-8px", borderRadius: "100px", border: "none", background: "#E5DAFB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-4 tap-96">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>
        </div>
      </header>
      {v.sqHas ? (
        <div style={{ padding: "8px 20px 0" }}>
          {list(v.suggestions).map((g: any, $i: number) => (
            <button key={$i} onClick={g?.onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "14px 0", border: "none", borderBottom: "1px solid #EFEFF2", background: "none", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span style={{ flex: "1", fontSize: "14px", fontWeight: "500", color: "#0F0F12" }}>{g?.label}</span>
              <span style={{ fontSize: "11px", color: "#A5A5AD", fontWeight: "600" }}>{g?.kind}</span>
            </button>
          ))}
          <button onClick={v.submitSq} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "14px 0", border: "none", background: "none", textAlign: "left", cursor: "pointer", color: "#4700D8", fontSize: "14px", fontWeight: "700", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            Ver resultados para “{txt(v.sq)}” →
          </button>
        </div>
      ) : null}
      {v.sqEmpty ? (
        <>
          <section style={{ padding: "24px 20px 8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <p style={{ margin: "0", fontSize: "11px", fontWeight: "700", color: "#7E7E87", letterSpacing: ".12em", textTransform: "uppercase" }}>
                Búsquedas recientes
              </p>
              <button onClick={v.clearRecent} style={{ border: "none", background: "none", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                Borrar
              </button>
            </div>
            {list(v.recent).map((r: any, $i: number) => (
              <button key={$i} onClick={r?.onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "14px 0", border: "none", borderBottom: "1px solid #EFEFF2", background: "none", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A5A5AD" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#0F0F12" }}>{r?.label}</span>
              </button>
            ))}
          </section>
          <section style={{ padding: "16px 20px" }}>
            <h2 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Recién añadidos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {list(v.newest).map((p: any, $i: number) => (
                <div key={$i} onClick={p?.onClick} style={sx(`cursor:pointer;min-width:0;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98">
                  <div style={{ position: "relative", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", marginBottom: "8px", background: "#EFEFF2" }}>
                    <img src={p?.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {p?.tagLabel ? (
                      <span style={{ position: "absolute", top: "8px", left: "8px", padding: "2px 8px", borderRadius: "100px", background: "#FFDC6E", color: "#B8951F", fontSize: "9px", fontWeight: "800" }}>
                        {"⭐ "}{txt(p?.tagLabel)}
                      </span>
                    ) : null}
                    <button onClick={p?.onLike} style={{ position: "absolute", top: "8px", right: "8px", width: "28px", height: "28px", borderRadius: "100px", border: "none", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={p?.heartFill} stroke={p?.heartStroke} strokeWidth="2.2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                  <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p?.name}
                  </p>
                  <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{txt(p?.comuna)}{" · "}{txt(p?.km)}{" km"}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
                    <span style={{ color: "#FFDC6E", fontSize: "11px" }}>★</span>
                    <span style={{ fontSize: "11px", fontWeight: "700" }}>{p?.rating}</span>
                    <span style={{ fontSize: "10px", color: "#7E7E87" }}>({txt(p?.reviews)})</span>
                  </div>
                  <p style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#4700D8" }}>
                    {txt(p?.price)}{" "}
                    <span style={{ fontSize: "10px", color: "#7E7E87", fontWeight: "500" }}>/{txt(p?.unit)}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  )
}
