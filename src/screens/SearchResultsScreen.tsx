import { list, sx, txt, type Vals } from '../lib/view'

export function SearchResultsScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Resultados de búsqueda" style={{ padding: "var(--sb) 0 40px", background: "#F7F7F9", minHeight: "100%", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ position: "sticky", top: "max(calc(var(--sb) - 1px),0px)", zIndex: "4", background: "#FFFFFF", borderBottom: "1px solid #E3E3E7" }}>
        <header style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px 4px" }}>
          <button onClick={v.back} style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button onClick={v.editSearch} style={{ flex: "1", minWidth: "0", display: "flex", alignItems: "center", gap: "12px", height: "44px", padding: "0 16px", background: "#F7F7F9", border: "none", borderRadius: "100px", cursor: "pointer", textAlign: "left", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ flex: "1", fontSize: "14px", fontWeight: "600", color: "#0F0F12", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {v.sqCommitted}
            </span>
          </button>
        </header>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", padding: "10px 16px 12px" }}>
          {list(v.rFilters).map((c: any, $i: number) => (
            <button key={$i} onClick={c?.onClick} style={sx(`flex:none;height:36px;padding:0 16px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
              {c?.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 12px" }}>
        <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>{v.rCount}</h2>
        <button onClick={v.goExplore} style={{ display: "flex", alignItems: "center", gap: "6px", border: "none", background: "none", color: "#4700D8", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Mapa
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 20px" }}>
        {list(v.rTop).map((p: any, $i: number) => (
          <div key={$i} onClick={p?.onClick} style={sx(`display:flex;gap:12px;padding:10px;background:#FFFFFF;border:1px solid #EFEFF2;border-radius:14px;cursor:pointer;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98 hover-6">
            <div style={{ position: "relative", flex: "none" }}>
              <img src={p?.cover} alt="" style={{ width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "20px", height: "20px", borderRadius: "100px", background: "#4700D8", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
            </div>
            <div style={{ flex: "1", minWidth: "0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
                <p style={{ margin: "0", fontSize: "14px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p?.name}
                </p>
                <svg onClick={p?.onLike} width="16" height="16" viewBox="0 0 24 24" fill={p?.heartFill} stroke={p?.heartStrokeList} strokeWidth="2" style={{ flex: "none", cursor: "pointer" }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{txt(p?.comuna)}{" · "}{txt(p?.km)}{" km"}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                <span style={{ color: "#FFDC6E", fontSize: "11px" }}>★</span>
                <span style={{ fontSize: "11px", fontWeight: "700" }}>{p?.rating}</span>
                <span style={{ fontSize: "10px", color: "#7E7E87" }}>({txt(p?.reviews)})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#4700D8" }}>
                  {txt(p?.price)}{" "}
                  <span style={{ fontSize: "10px", color: "#7E7E87", fontWeight: "500" }}>/{txt(p?.unit)}</span>
                </p>
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#56565F", padding: "2px 8px", background: "#EFEFF2", borderRadius: "100px" }}>
                  {p?.service}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {v.rShowSponsored ? (
        <section style={{ padding: "24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h2 style={{ margin: "0", display: "flex", alignItems: "center", gap: "8px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "100px", background: "#FFDC6E", color: "#B8951F", fontSize: "10px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                P
              </span>
              Patrocinados
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {list(v.rSponsored).map((p: any, $i: number) => (
              <div key={$i} onClick={p?.onClick} style={sx(`cursor:pointer;min-width:0;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98">
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", marginBottom: "8px", background: "#EFEFF2" }}>
                  <img src={p?.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: "8px", left: "8px", padding: "2px 8px", borderRadius: "100px", background: "#FFDC6E", color: "#B8951F", fontSize: "9px", fontWeight: "800" }}>
                    ⭐ Top rated
                  </span>
                </div>
                <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p?.name}
                </p>
                <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{txt(p?.comuna)}{" · "}{txt(p?.km)}{" km"}</p>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#4700D8" }}>
                  {txt(p?.price)}{" "}
                  <span style={{ fontSize: "10px", color: "#7E7E87", fontWeight: "500" }}>/{txt(p?.unit)}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 20px" }}>
        {list(v.rRest).map((p: any, $i: number) => (
          <div key={$i} onClick={p?.onClick} style={sx(`display:flex;gap:12px;padding:10px;background:#FFFFFF;border:1px solid #EFEFF2;border-radius:14px;cursor:pointer;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98 hover-6">
            <div style={{ position: "relative", flex: "none" }}>
              <img src={p?.cover} alt="" style={{ width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "20px", height: "20px", borderRadius: "100px", background: "#4700D8", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
            </div>
            <div style={{ flex: "1", minWidth: "0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
                <p style={{ margin: "0", fontSize: "14px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p?.name}
                </p>
                <svg onClick={p?.onLike} width="16" height="16" viewBox="0 0 24 24" fill={p?.heartFill} stroke={p?.heartStrokeList} strokeWidth="2" style={{ flex: "none", cursor: "pointer" }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{txt(p?.comuna)}{" · "}{txt(p?.km)}{" km"}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                <span style={{ color: "#FFDC6E", fontSize: "11px" }}>★</span>
                <span style={{ fontSize: "11px", fontWeight: "700" }}>{p?.rating}</span>
                <span style={{ fontSize: "10px", color: "#7E7E87" }}>({txt(p?.reviews)})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#4700D8" }}>
                  {txt(p?.price)}{" "}
                  <span style={{ fontSize: "10px", color: "#7E7E87", fontWeight: "500" }}>/{txt(p?.unit)}</span>
                </p>
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#56565F", padding: "2px 8px", background: "#EFEFF2", borderRadius: "100px" }}>
                  {p?.service}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {v.rEmpty ? (
        <div style={{ textAlign: "center", padding: "48px 20px" }}>
          <p style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800" }}>Sin resultados para “{txt(v.sqCommitted)}”</p>
          <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#7E7E87" }}>Prueba con otra palabra o quita los filtros</p>
          <button onClick={v.editSearch} style={{ height: "40px", padding: "0 20px", borderRadius: "20px", border: "none", background: "#F4EEFE", color: "#4700D8", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            Nueva búsqueda
          </button>
        </div>
      ) : null}
    </div>
  )
}
