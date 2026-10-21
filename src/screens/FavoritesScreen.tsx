import { list, sx, txt, type Vals } from '../lib/view'

export function FavoritesScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Mis favoritos" style={{ minHeight: "100%", background: "#F7F7F9", paddingBottom: "40px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ position: "sticky", top: "0", zIndex: "4", background: "#FFFFFF", borderBottom: "1px solid #E3E3E7", padding: "0 20px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
          <button onClick={v.back} style={{ width: "40px", height: "40px", marginLeft: "-8px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s" }} className="tap-94">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>Mis favoritos</h1>
        </div>
        <div style={{ display: "flex", gap: "4px", padding: "4px", background: "#EFEFF2", borderRadius: "100px", marginBottom: "12px" }}>
          {list(v.favSorts).map((t: any, $i: number) => (
            <button key={$i} onClick={t?.onClick} style={sx(`flex:1;height:34px;border-radius:100px;border:none;font-size:13px;font-weight:700;white-space:nowrap;cursor:pointer;transition:all .2s;background:${t?.bg ?? ""};color:${t?.color ?? ""};box-shadow:${t?.shadow ?? ""}`)}>
              {t?.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", margin: "0 -20px", padding: "0 20px" }}>
          {list(v.favCats).map((c: any, $i: number) => (
            <button key={$i} onClick={c?.onClick} style={sx(`flex:none;height:34px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s`)} className="tap-96">
              {c?.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 20px 12px" }}>
        <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>{v.favCount}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 20px" }}>
        {list(v.favList).map((p: any, $i: number) => (
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
              <p style={sx(`display:flex;align-items:center;gap:4px;margin:0 0 6px;font-size:11px;font-weight:600;color:${p?.usedColor ?? ""}`)}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {txt(p?.usedLabel)}
              </p>
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
      {v.favEmpty ? (
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ width: "64px", height: "64px", margin: "0 auto 14px", borderRadius: "100px", background: "#FDDFD9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F35843" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <p style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800" }}>{v.favEmptyTitle}</p>
          <p style={{ margin: "0 0 16px", fontSize: "13px", lineHeight: "1.5", color: "#7E7E87" }}>
            Toca el corazón en cualquier servicio para guardarlo aquí.
          </p>
          <button onClick={v.goHome} style={{ height: "40px", padding: "0 20px", borderRadius: "20px", border: "none", background: "#F4EEFE", color: "#4700D8", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "transform .15s" }} className="tap-96">
            Explorar servicios
          </button>
        </div>
      ) : null}
    </div>
  )
}
