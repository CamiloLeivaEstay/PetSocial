import { Fragment } from 'react'
import { list, sx, txt, type Vals } from '../lib/view'

export function PetDetailScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Detalle mascota" style={{ paddingBottom: "40px", background: "#FFFFFF", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ position: "relative", height: "300px" }}>
        <img src={v.pet?.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: "0", background: "linear-gradient(0deg,rgba(15,15,18,.4),rgba(15,15,18,0) 60%)" }} />
        <div style={{ position: "absolute", top: "calc(var(--sb) + 9px)", left: "16px", right: "16px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={v.back} style={{ width: "40px", height: "40px", borderRadius: "100px", border: "none", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button onClick={v.editPet} style={{ width: "40px", height: "40px", borderRadius: "100px", border: "none", background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
        </div>
      </div>
      <div style={{ position: "relative", marginTop: "-24px", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "24px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "4px" }}>
          <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.03em", lineHeight: "1.1" }}>{v.pet?.name}</h1>
          <span style={{ padding: "6px 12px", borderRadius: "100px", background: "#E5DAFB", color: "#3300A8", fontSize: "12px", fontWeight: "700" }}>
            {v.pet?.speciesLabel}
          </span>
        </div>
        <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#56565F", fontWeight: "500" }}>{txt(v.pet?.breed)}{" · "}{txt(v.pet?.age)}</p>
        <div style={{ display: "flex", gap: "4px", padding: "4px", background: "#EFEFF2", borderRadius: "100px", marginBottom: "20px" }}>
          {list(v.petTabs).map((t: any, $i: number) => (
            <button key={$i} onClick={t?.onClick} style={sx(`flex:1;height:36px;border-radius:100px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;background:${t?.bg ?? ""};color:${t?.color ?? ""};box-shadow:${t?.shadow ?? ""}`)} className="tap-96">
              {t?.label}
            </button>
          ))}
        </div>
        {v.petTabResumen ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "12px", marginBottom: "20px" }}>
              {list(v.petStats).map((st: any, $i: number) => (
                <div key={$i} style={{ background: "#F7F7F9", borderRadius: "14px", padding: "12px", textAlign: "center" }}>
                  <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: "600", letterSpacing: ".06em", textTransform: "uppercase", color: "#7E7E87" }}>
                    {st?.label}
                  </p>
                  <p style={sx(`margin:0;font-size:13px;font-weight:800;color:${st?.color ?? ""}`)}>{st?.value}</p>
                </div>
              ))}
            </div>
            {v.petNext ? (
              <div onClick={v.petNext?.onClick} style={sx(`display:flex;align-items:center;gap:12px;padding:12px;margin-bottom:20px;border-radius:20px;cursor:pointer;background:${v.petNext?.bg ?? ""}`)}>
                <img src={v.petNext?.cover} alt="" style={{ width: "48px", height: "48px", flex: "none", borderRadius: "14px", objectFit: "cover" }} />
                <div style={{ flex: "1", minWidth: "0" }}>
                  <p style={sx(`margin:0 0 2px;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${v.petNext?.eyebrowColor ?? ""}`)}>
                    {v.petNext?.eyebrow}
                  </p>
                  <p style={sx(`margin:0;font-size:14px;font-weight:800;color:${v.petNext?.color ?? ""};white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                    {v.petNext?.title}
                  </p>
                  <p style={sx(`margin:0;font-size:12px;font-weight:500;color:${v.petNext?.sub ?? ""}`)}>{v.petNext?.when}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={v.petNext?.color} strokeWidth="2.2" strokeLinecap="round" style={{ flex: "none" }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            ) : null}
            <section>
              <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>Datos</h2>
              <div style={{ border: "1px solid #EFEFF2", borderRadius: "20px", padding: "4px 16px" }}>
                {list(v.petFacts).map((x: any, $i: number) => (
                  <div key={$i} style={sx(`display:flex;justify-content:space-between;gap:12px;padding:12px 0;font-size:13px;border-bottom:${x?.border ?? ""}`)}>
                    <span style={{ color: "#7E7E87", fontWeight: "500" }}>{x?.k}</span>
                    <span style={{ fontWeight: "700", color: "#0F0F12", textAlign: "right" }}>{x?.v}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
        {v.petTabSalud ? (
          <>
            {v.pet?.hasAllergies ? (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", borderRadius: "14px", background: "#FDDFD9", marginBottom: "20px" }}>
                <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", background: "#F35843", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </span>
                <div>
                  <p style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: "800", color: "#B82E1C" }}>Alergias declaradas</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {list(v.pet?.allergies).map((a: any, $i: number) => (
                      <span key={$i} style={{ padding: "3px 10px", borderRadius: "100px", background: "#FECACA", color: "#B91C1C", fontSize: "11px", fontWeight: "700" }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            <section style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>Vacunas</h2>
                <button style={{ border: "none", background: "none", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                  + Subir carnet
                </button>
              </div>
              <div style={{ border: "1px solid #EFEFF2", borderRadius: "20px", padding: "4px 16px" }}>
                {list(v.petVaccines).map((v: any, $i: number) => (
                  <div key={$i} style={sx(`display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:${v?.border ?? ""}`)}>
                    <span style={sx(`width:36px;height:36px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;background:${v?.iconBg ?? ""}`)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={v?.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 2 4 4" />
                        <path d="m17 7 3-3" />
                        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
                        <path d="m9 11 4 4" />
                        <path d="m5 19-3 3" />
                        <path d="m14 4 6 6" />
                      </svg>
                    </span>
                    <div style={{ flex: "1", minWidth: "0" }}>
                      <p style={{ margin: "0", fontSize: "13px", fontWeight: "700" }}>{v?.name}</p>
                      <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87" }}>{v?.detail}</p>
                    </div>
                    <span style={sx(`padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;flex:none;background:${v?.badgeBg ?? ""};color:${v?.badgeColor ?? ""}`)}>
                      {v?.badge}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>Observaciones de profesionales</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {list(v.petNotes).map((n: any, $i: number) => (
                  <div key={$i} style={{ border: "1px solid #EFEFF2", borderRadius: "20px", padding: "14px 16px" }}>
                    <p style={{ margin: "0 0 6px", fontSize: "13px", lineHeight: "1.5", color: "#0F0F12", textWrap: "pretty" }}>{n?.text}</p>
                    <p style={{ margin: "0", fontSize: "11px", fontWeight: "600", color: "#A5A5AD" }}>{txt(n?.by)}{" · "}{txt(n?.date)}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
        {v.petTabHist ? (
          <>
            <div onClick={v.openCert} style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", gap: "12px", padding: "14px", marginBottom: "16px", borderRadius: "20px", background: "linear-gradient(145deg,#4700D8,#3300A8)", cursor: "pointer", boxShadow: "0 8px 24px rgba(71,0,216,.22)", transition: "transform .15s cubic-bezier(.2,.8,.2,1)" }} className="tap-98">
              <span style={{ position: "absolute", right: "-30px", top: "-44px", width: "120px", height: "120px", borderRadius: "100px", background: "rgba(255,255,255,.08)" }} />
              <span style={{ position: "relative", width: "44px", height: "44px", flex: "none", borderRadius: "100px", background: "rgba(255,255,255,.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </span>
              <span style={{ position: "relative", flex: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", fontWeight: "800", color: "#FFFFFF" }}>Certificado de viaje</span>
                <span style={{ display: "block", fontSize: "12px", lineHeight: "1.4", color: "#E5DAFB" }}>
                  {"Para que "}{txt(v.pet?.name)}{" viaje contigo en cabina o fuera del país"}
                </span>
              </span>
              <span style={{ position: "relative", flex: "none", height: "32px", padding: "0 12px", borderRadius: "100px", background: "#FFFFFF", color: "#4700D8", fontSize: "12px", fontWeight: "800", display: "flex", alignItems: "center" }}>
                Solicitar
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", margin: "0 -20px 16px", padding: "0 20px" }}>
              {list(v.histFilters).map((c: any, $i: number) => (
                <button key={$i} onClick={c?.onClick} style={sx(`flex:none;height:34px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                  {c?.label}
                </button>
              ))}
            </div>
            {list(v.petHistory).map((x: any, $i: number) => (
              <Fragment key={$i}>
                {x?.header ? (
                  <p style={{ margin: "8px 0 10px", fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#7E7E87" }}>
                    {x?.header}
                  </p>
                ) : null}
                <div onClick={x?.onClick} style={{ display: "flex", gap: "12px", cursor: "pointer" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", width: "40px" }}>
                    <img src={x?.cover} alt="" style={sx(`width:40px;height:40px;border-radius:100px;object-fit:cover;flex:none;border:2px solid ${x?.ring ?? ""}`)} />
                    <span style={sx(`flex:1;width:2px;background:#EFEFF2;margin:4px 0;opacity:${x?.rail ?? ""}`)} />
                  </div>
                  <div style={{ flex: "1", minWidth: "0", marginBottom: "12px", padding: "12px 14px", border: "1px solid #EFEFF2", borderRadius: "20px", background: "#FFFFFF" }} className="hover-6">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "2px" }}>
                      <p style={{ margin: "0", fontSize: "14px", fontWeight: "800" }}>{x?.title}</p>
                      <span style={sx(`padding:3px 8px;border-radius:100px;font-size:10px;font-weight:700;white-space:nowrap;flex:none;background:${x?.badgeBg ?? ""};color:${x?.badgeColor ?? ""}`)}>
                        {x?.badge}
                      </span>
                    </div>
                    <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{x?.place}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                      <span style={{ color: "#56565F", fontWeight: "600" }}>{x?.date}</span>
                      <span style={{ fontWeight: "800", color: "#4700D8" }}>{x?.price}</span>
                    </div>
                    {x?.note ? (
                      <p style={{ margin: "8px 0 0", paddingTop: "8px", borderTop: "1px solid #EFEFF2", fontSize: "12px", lineHeight: "1.45", color: "#56565F" }}>
                        {x?.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Fragment>
            ))}
            {v.histEmpty ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "800" }}>Sin registros todavía</p>
                <p style={{ margin: "0", fontSize: "13px", color: "#7E7E87" }}>{"Aquí verás cada servicio y visita de "}{txt(v.pet?.name)}</p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}
