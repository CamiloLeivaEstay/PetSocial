import { list, sx, txt, type Vals } from '../lib/view'

export function CertRequestScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Certificado de viaje" style={{ padding: "0 20px 130px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
        <button onClick={v.certBack} style={{ width: "40px", height: "40px", marginLeft: "-8px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s" }} className="tap-94">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 style={{ margin: "0", flex: "1", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>Certificado de viaje</h1>
        <span style={{ fontSize: "12px", fontWeight: "600", color: "#7E7E87" }}>{"Paso "}{txt(v.ct?.step)}{" de 4"}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "6px", margin: "4px 0 22px" }}>
        {list(v.certBars).map((b: any, $i: number) => (
          <span key={$i} style={sx(`height:4px;border-radius:100px;transition:background-color .3s;background:${b?.bg ?? ""}`)} />
        ))}
      </div>
      {v.ct?.s1 ? (
        <div style={{ animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.025em", textWrap: "balance" }}>
            {"¿Cómo viajará "}{txt(v.ct?.petName)}?
          </h2>
          <p style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "1.5", color: "#7E7E87", textWrap: "pretty" }}>
            Un profesional evalúa a tu mascota y firma el certificado. Queda en su historial para descargarlo y presentarlo cuando viajes.
          </p>
          {v.ct?.multiPet ? (
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", margin: "0 -20px 18px", padding: "0 20px" }}>
              {list(v.certPets).map((p: any, $i: number) => (
                <button key={$i} onClick={p?.onClick} style={sx(`flex:none;display:flex;align-items:center;gap:8px;height:40px;padding:0 14px 0 4px;border-radius:100px;font-size:13px;font-weight:700;cursor:pointer;background:${p?.bg ?? ""};color:${p?.color ?? ""};border:1.5px solid ${p?.border ?? ""};transition:all .2s`)}>
                  <img src={p?.photo} alt="" style={{ width: "30px", height: "30px", borderRadius: "100px", objectFit: "cover" }} />
                  {txt(p?.name)}
                </button>
              ))}
            </div>
          ) : null}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {list(v.certTypes).map((o: any, $i: number) => (
              <button key={$i} onClick={o?.onClick} style={sx(`display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:20px;text-align:left;cursor:pointer;transition:all .2s;background:${o?.bg ?? ""};border:${o?.border ?? ""}`)} className="tap-98">
                <span style={sx(`width:44px;height:44px;flex:none;border-radius:14px;display:flex;align-items:center;justify-content:center;transition:background-color .2s;background:${o?.iconBg ?? ""}`)}>
                  {o?.isCabin ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={o?.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                      <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
                      <path d="M5 18v2" />
                      <path d="M19 18v2" />
                    </svg>
                  ) : null}
                  {o?.isIntl ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={o?.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ) : null}
                </span>
                <span style={{ flex: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "15px", fontWeight: "800", color: "#0F0F12", marginBottom: "2px" }}>{o?.label}</span>
                  <span style={{ display: "block", fontSize: "12px", lineHeight: "1.45", color: "#56565F", textWrap: "pretty" }}>{o?.desc}</span>
                </span>
                <span style={sx(`width:22px;height:22px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:12px;font-weight:800;background:${o?.checkBg ?? ""};border:${o?.checkBorder ?? ""}`)}>
                  {o?.check}
                </span>
              </button>
            ))}
          </div>
          {v.ct?.weightNote ? (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px 14px", marginBottom: "20px", borderRadius: "14px", background: "#FFFBEB", animation: "fade .25s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "1px" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.5", color: "#92400E", fontWeight: "500", textWrap: "pretty" }}>
                {v.ct?.weightNote}
              </p>
            </div>
          ) : null}
          <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>Destino</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {list(v.certCountries).map((c: any, $i: number) => (
              <button key={$i} onClick={c?.onClick} style={sx(`height:36px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:background-color .2s,color .2s,border-color .2s,transform .15s`)} className="tap-96">
                {c?.label}
              </button>
            ))}
          </div>
          <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>Aerolínea</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {list(v.certAirlines).map((c: any, $i: number) => (
              <button key={$i} onClick={c?.onClick} style={sx(`height:36px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:background-color .2s,color .2s,border-color .2s,transform .15s`)} className="tap-96">
                {c?.label}
              </button>
            ))}
          </div>
          <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>Fecha del viaje</p>
          <input type="date" value={v.ct?.travel ?? ""} min={v.ct?.minDate} onChange={v.certOnTravel} style={{ width: "100%", height: "48px", padding: "0 16px", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", color: "#0F0F12", background: "#FFFFFF", border: "1px solid #E3E3E7", borderRadius: "100px", outline: "none" }} className="focus-1" />
        </div>
      ) : null}
      {v.ct?.s2 ? (
        <div style={{ animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.025em", textWrap: "balance" }}>
            {"Requisitos para el "}{txt(v.ct?.typeShort)}
          </h2>
          <p style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "1.5", color: "#7E7E87", textWrap: "pretty" }}>
            {"Revisamos la ficha de "}{txt(v.ct?.petName)}. Lo pendiente se resuelve en la cita con el profesional.
          </p>
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "4px 16px", marginBottom: "16px" }}>
            {list(v.certReqs).map((r: any, $i: number) => (
              <div key={$i} style={sx(`display:flex;gap:12px;align-items:flex-start;padding:14px 0;border-bottom:${r?.border ?? ""};animation:fadeUp .4s cubic-bezier(.2,.8,.2,1) both;animation-delay:${r?.delay ?? ""}`)}>
                <span style={sx(`width:28px;height:28px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;background:${r?.iconBg ?? ""};color:${r?.iconColor ?? ""}`)}>
                  {r?.icon}
                </span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "2px" }}>
                    <p style={{ margin: "0", fontSize: "14px", fontWeight: "700", color: "#0F0F12" }}>{r?.t}</p>
                    <span style={sx(`flex:none;padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;white-space:nowrap;background:${r?.iconBg ?? ""};color:${r?.iconColor ?? ""}`)}>
                      {r?.tag}
                    </span>
                  </div>
                  <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.45", color: "#7E7E87", textWrap: "pretty" }}>{r?.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ display: "flex", gap: "8px", alignItems: "flex-start", margin: "0", fontSize: "12px", lineHeight: "1.5", color: "#7E7E87" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "2px" }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Cada aerolínea y país define sus propias reglas. Confírmalas antes de comprar tu pasaje.
          </p>
        </div>
      ) : null}
      {v.ct?.s3 ? (
        <div style={{ animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.025em", textWrap: "balance" }}>
            Elige al profesional
          </h2>
          <p style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "1.5", color: "#7E7E87", textWrap: "pretty" }}>{v.ct?.proHint}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {list(v.certPros).map((p: any, $i: number) => (
              <button key={$i} onClick={p?.onClick} style={sx(`display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:20px;text-align:left;cursor:pointer;transition:all .2s;background:${p?.bg ?? ""};border:${p?.border ?? ""}`)} className="tap-98">
                <span style={sx(`width:48px;height:48px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#FFFFFF;background:${p?.avatarBg ?? ""}`)}>
                  {p?.initials}
                </span>
                <span style={{ flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "800", color: "#0F0F12" }}>{p?.name}</span>
                    <span style={{ flex: "none", fontSize: "12px", fontWeight: "700", color: "#0F0F12" }}>
                      <span style={{ color: "#FFB800" }}>★</span>
                      {" "}{txt(p?.rating)}
                    </span>
                  </span>
                  <span style={{ display: "block", margin: "1px 0 4px", fontSize: "12px", fontWeight: "600", color: "#4700D8" }}>{p?.role}</span>
                  <span style={{ display: "block", fontSize: "12px", lineHeight: "1.4", color: "#56565F" }}>{p?.mode}</span>
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                    <span style={{ font: "500 10px 'JetBrains Mono',monospace", color: "#7E7E87" }}>{p?.reg}</span>
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "#4700D8" }}>{p?.price}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
          {v.ct?.hasPro ? (
            <div style={{ animation: "fadeUp .3s cubic-bezier(.2,.8,.2,1) both" }}>
              <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>Horario disponible</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {list(v.certSlots).map((c: any, $i: number) => (
                  <button key={$i} onClick={c?.onClick} style={sx(`height:36px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:background-color .2s,color .2s,border-color .2s,transform .15s`)} className="tap-96">
                    {c?.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {v.ct?.s4 ? (
        <div style={{ animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.025em", textWrap: "balance" }}>
            Revisa y confirma
          </h2>
          <p style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "1.5", color: "#7E7E87", textWrap: "pretty" }}>
            {"El certificado se emite después de la evaluación y queda guardado en el historial de "}{txt(v.ct?.petName)}.
          </p>
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "6px 16px", marginBottom: "12px" }}>
            {list(v.certSummary).map((x: any, $i: number) => (
              <div key={$i} style={sx(`display:flex;justify-content:space-between;gap:12px;padding:10px 0;font-size:13px;border-bottom:${x?.border ?? ""}`)}>
                <span style={{ color: "#7E7E87", fontWeight: "500", flex: "none" }}>{x?.k}</span>
                <span style={{ textAlign: "right", fontWeight: "700", color: "#0F0F12" }}>{x?.v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "14px 16px", marginBottom: "12px" }}>
            {list(v.certPay).map((x: any, $i: number) => (
              <div key={$i} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                <span style={{ color: "#34343D" }}>{x?.k}</span>
                <b>{x?.v}</b>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "10px", borderTop: "1px solid #EFEFF2" }}>
              <span style={{ fontSize: "15px", fontWeight: "800" }}>Total</span>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#4700D8" }}>{v.ct?.total}</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{"Pagas con "}{txt(v.ct?.card)}</p>
          </div>
          <button onClick={v.certToggleAgree} style={{ width: "100%", display: "flex", gap: "12px", alignItems: "flex-start", padding: "14px", borderRadius: "14px", border: "none", background: "#F7F7F9", textAlign: "left", cursor: "pointer" }}>
            <span style={sx(`width:22px;height:22px;flex:none;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:13px;font-weight:800;transition:all .2s;background:${v.ct?.agreeBg ?? ""};border:2px solid ${v.ct?.agreeBorder ?? ""}`)}>
              {v.ct?.agreeCheck}
            </span>
            <span style={{ fontSize: "12px", lineHeight: "1.5", color: "#34343D", textWrap: "pretty" }}>
              {"Declaro que la información de "}{txt(v.ct?.petName)}{" es verídica y que el certificado depende de la evaluación del profesional."}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
