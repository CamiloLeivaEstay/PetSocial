import { list, sx, txt, type Vals } from '../lib/view'

export function HomeScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Home" style={{ paddingBottom: "110px", background: "#F7F7F9", minHeight: "100%", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <header style={{ padding: "calc(var(--sb) + 12px) 20px 0", background: "#FFFFFF", width: "370px", height: "158px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: "16px", color: "#56565F", fontWeight: "500", lineHeight: "1", whiteSpace: "nowrap" }}>
              {txt(v.greeting)}{" 👋"}
            </p>
            <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.03em", lineHeight: "1" }}>Diego</h1>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={v.goPetAI} style={{ display: "flex", alignItems: "center", gap: "6px", height: "40px", padding: "0 14px", borderRadius: "100px", border: "none", background: "#E5DAFB", color: "#4700D8", fontWeight: "700", fontSize: "13px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-4 tap-96">
              <span style={{ width: "24px", height: "24px", flex: "none", borderRadius: "100px", background: "linear-gradient(135deg,#6E2BF4,#4700D8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                  <path fill="white" d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6L10 3z" />
                  <path fill="white" strokeWidth="1.2" d="M18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13z" />
                </svg>
              </span>
              Pet IA
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <button onClick={v.openPetSheet} style={{ display: "flex", alignItems: "center", gap: "8px", height: "32px", padding: "0 12px 0 4px", borderRadius: "100px", border: "none", background: "#F7F7F9", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <img src={v.activePet?.photo} alt="" style={{ width: "24px", height: "24px", borderRadius: "100px", objectFit: "cover" }} />
            <span style={{ fontSize: "13px", fontWeight: "700" }}>{v.activePet?.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2.4" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button onClick={v.addPet} style={{ display: "flex", alignItems: "center", gap: "4px", height: "32px", padding: "0 12px", borderRadius: "100px", border: "none", background: "transparent", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            + Añadir
          </button>
        </div>
      </header>
      <div style={{ position: "sticky", top: "43px", zIndex: "4", background: "#FFFFFF", borderBottom: "1px solid #E3E3E7", paddingTop: "4px" }}>
        <div style={{ padding: "0 20px 12px" }}>
          <button onClick={v.goSearch} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", height: "48px", padding: "0 16px", background: "#F7F7F9", border: "none", borderRadius: "100px", cursor: "pointer", textAlign: "left", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ flex: "1", fontSize: "14px", color: "#7E7E87", fontWeight: "500" }}>Hoteles, paseos, veterinarios...</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", padding: "0 20px 14px" }}>
          {list(v.cats).map((c: any, $i: number) => (
            <button key={$i} onClick={c?.onClick} style={sx(`flex:none;height:36px;padding:0 16px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
              {c?.label}
            </button>
          ))}
        </div>
      </div>
      {v.homeAll ? (
        <>
          <div style={{ padding: "20px 20px 24px" }}>
            {v.homeLive ? (
              <div onClick={v.homeLive?.onClick} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px 12px 12px", marginBottom: "16px", background: "#1C1C22", borderRadius: "20px", cursor: "pointer", boxShadow: "0 8px 24px rgba(15,15,18,.18)" }} className="hover-5">
                <div style={{ position: "relative", flex: "none", width: "48px", height: "48px" }}>
                  <span style={{ position: "absolute", inset: "0", borderRadius: "100px", background: "rgba(157,122,240,.5)", animation: "livePulse 2s ease-out infinite" }} />
                  <img src={v.homeLive?.photo} alt="" style={{ position: "relative", width: "48px", height: "48px", borderRadius: "100px", objectFit: "cover", border: "2px solid #1C1C22" }} />
                </div>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <p style={{ margin: "0 0 2px", display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", textTransform: "uppercase", color: "#C5AEF5" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "#F35843" }} />
                    {"En vivo · "}{txt(v.homeLive?.prov)}
                  </p>
                  <p style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: "800", color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {v.homeLive?.title}
                  </p>
                  <div style={{ height: "4px", borderRadius: "100px", background: "rgba(255,255,255,.15)", overflow: "hidden" }}>
                    <div style={sx(`height:100%;border-radius:100px;background:#9D7AF0;transition:width .4s;width:${v.homeLive?.pct ?? ""}`)} />
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" style={{ flex: "none" }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            ) : null}
            <div style={{ position: "relative", height: "128px", borderRadius: "20px", overflow: "hidden", background: "#E5DAFB" }}>
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg,rgba(197,174,245,.8),rgba(229,218,251,.4))" }} />
              <div style={{ position: "absolute", right: "0", top: "0", bottom: "0", width: "42%" }}>
                <img src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", padding: "18px 20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", lineHeight: "1.2", maxWidth: "58%", letterSpacing: "-0.01em" }}>
                  {v.promo?.title}
                </h3>
                <button onClick={v.nextPromo} style={{ height: "32px", padding: "0 16px", borderRadius: "100px", border: "none", background: "#FFFFFF", fontSize: "12px", fontWeight: "700", cursor: "pointer", marginBottom: "10px", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                  Más info
                </button>
              </div>
              <div style={{ position: "absolute", bottom: "12px", left: "20px", display: "flex", gap: "4px" }}>
                {list(v.promoDots).map((d: any, $i: number) => (
                  <span key={$i} style={sx(`height:6px;border-radius:100px;transition:all .25s;width:${d?.w ?? ""};background:${d?.bg ?? ""}`)} />
                ))}
              </div>
            </div>
          </div>
          <section style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: "12px" }}>
              <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Destacados</h2>
              <button onClick={v.goExplore} style={{ border: "none", background: "none", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                Ver todos →
              </button>
            </div>
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "0 20px" }}>
              {list(v.featured).map((p: any, $i: number) => (
                <div key={$i} onClick={p?.onClick} style={sx(`flex:none;width:180px;cursor:pointer;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98">
                  <div style={{ position: "relative", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", marginBottom: "10px", background: "#EFEFF2" }}>
                    <img src={p?.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {p?.tagLabel ? (
                      <span style={{ position: "absolute", top: "8px", left: "8px", padding: "4px 8px", borderRadius: "100px", background: "#FFDC6E", color: "#B8951F", fontSize: "10px", fontWeight: "800" }}>
                        {"⭐ "}{txt(p?.tagLabel)}
                      </span>
                    ) : null}
                    <button onClick={p?.onLike} style={{ position: "absolute", top: "8px", right: "8px", width: "32px", height: "32px", borderRadius: "100px", border: "none", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill={p?.heartFill} stroke={p?.heartStroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                  <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p?.name}
                  </p>
                  <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{txt(p?.comuna)}{" · "}{txt(p?.km)}{" km"}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                    <span style={{ color: "#FFDC6E", fontSize: "12px" }}>★</span>
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>{p?.rating}</span>
                    <span style={{ fontSize: "11px", color: "#7E7E87" }}>({txt(p?.reviews)})</span>
                  </div>
                  <p style={{ margin: "0", fontSize: "14px", fontWeight: "800", color: "#4700D8" }}>
                    {txt(p?.price)}{" "}
                    <span style={{ fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>/{txt(p?.unit)}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section style={{ padding: "0 20px", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Cerca de ti</h2>
              <button onClick={v.goExplore} style={{ border: "none", background: "none", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", gap: "4px", alignItems: "center", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Mapa
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {list(v.nearby).map((p: any, $i: number) => (
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
                      <p style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#F35843" }}>
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
          </section>
          <section style={{ padding: "0 20px", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Mejor valorados ⭐</h2>
              <button onClick={v.goExplore} style={{ border: "none", background: "none", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                Ver todos →
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {list(v.topRated).map((p: any, $i: number) => (
                <div key={$i} onClick={p?.onClick} style={sx(`cursor:pointer;min-width:0;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98">
                  <div style={{ position: "relative", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", marginBottom: "8px", background: "#EFEFF2" }}>
                    <img src={p?.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {p?.tagLabel ? (
                      <span style={{ position: "absolute", top: "6px", left: "6px", padding: "2px 8px", borderRadius: "100px", background: "#FFDC6E", color: "#B8951F", fontSize: "9px", fontWeight: "800" }}>
                        {"⭐ "}{txt(p?.tagLabel)}
                      </span>
                    ) : null}
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
          <div style={{ padding: "0 20px" }}>
            <div onClick={v.goPetAI} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "16px", background: "#F4EEFE", borderRadius: "14px", cursor: "pointer" }}>
              <div style={{ width: "44px", height: "44px", flex: "none", borderRadius: "14px", background: "linear-gradient(135deg,#6E2BF4,#4700D8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div style={{ flex: "1" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                  <p style={{ margin: "0", fontSize: "14px", fontWeight: "800" }}>Pet IA</p>
                  <span style={{ fontSize: "10px", fontWeight: "600", color: "#7E7E87", padding: "2px 8px", borderRadius: "100px", background: "#FFFFFF" }}>
                    Chatbot de emergencia
                  </span>
                </div>
                <p style={{ margin: "0", fontSize: "12px", color: "#56565F", lineHeight: "1.5" }}>
                  ¿Tu mascota muestra síntomas? Consulta con nuestra IA.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {v.homeFiltered ? (
        <div data-screen-label="Home · Resultados categoría" style={{ animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", padding: "16px 20px 4px" }}>
            {list(v.hFilters).map((c: any, $i: number) => (
              <button key={$i} onClick={c?.onClick} style={sx(`flex:none;height:34px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                {c?.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px" }}>
            <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>{v.hCount}</h2>
            <button onClick={v.goExplore} style={{ display: "flex", alignItems: "center", gap: "6px", border: "none", background: "none", color: "#4700D8", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Mapa
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 20px" }}>
            {list(v.hRes).map((p: any, $i: number) => (
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
          {v.hSemHas ? (
            <section style={{ padding: "24px 20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <h2 style={{ margin: "0", display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "100px", background: "#FFDC6E", color: "#B8951F", fontSize: "10px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    P
                  </span>
                  Patrocinados
                </h2>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#A5A5AD" }}>Anuncio</span>
              </div>
              <div style={{ display: "flex", gap: "12px", overflowX: "auto", scrollbarWidth: "none", margin: "0 -20px", padding: "0 20px 4px" }}>
                {list(v.hSem).map((p: any, $i: number) => (
                  <div key={$i} onClick={p?.onClick} style={sx(`flex:none;width:220px;background:#FFFFFF;border:1.5px solid #FFE9A8;border-radius:20px;overflow:hidden;cursor:pointer;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98 hover-6">
                    <div style={{ position: "relative", height: "112px", background: "#EFEFF2" }}>
                      <img src={p?.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <span style={{ position: "absolute", top: "8px", left: "8px", padding: "3px 8px", borderRadius: "100px", background: "#FFDC6E", color: "#7A5A00", fontSize: "10px", fontWeight: "800" }}>
                        Patrocinado
                      </span>
                      <button onClick={p?.onLike} style={{ position: "absolute", top: "8px", right: "8px", width: "28px", height: "28px", borderRadius: "100px", border: "none", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill={p?.heartFill} stroke={p?.heartStroke} strokeWidth="2.2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                    <div style={{ padding: "10px 12px 12px" }}>
                      <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {p?.name}
                      </p>
                      <p style={{ margin: "0 0 6px", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>
                        {txt(p?.serviceLabel)}{" · "}{txt(p?.comuna)}{" · "}{txt(p?.km)}{" km"}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#4700D8" }}>
                          {txt(p?.price)}{" "}
                          <span style={{ fontSize: "10px", color: "#7E7E87", fontWeight: "500" }}>/{txt(p?.unit)}</span>
                        </p>
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", fontWeight: "700" }}>
                          <span style={{ color: "#FFB800" }}>★</span>
                          {txt(p?.rating)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 20px" }}>
            {list(v.hResRest).map((p: any, $i: number) => (
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
          {v.hEmpty ? (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <p style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800" }}>Sin resultados con estos filtros</p>
              <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#7E7E87" }}>Prueba quitando un filtro</p>
              <button onClick={v.hClear} style={{ height: "40px", padding: "0 20px", borderRadius: "20px", border: "none", background: "#F4EEFE", color: "#4700D8", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                Ver todos los servicios
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
