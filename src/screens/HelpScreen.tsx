import { list, sx, type Vals } from '../lib/view'

export function HelpScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Ayuda" style={{ padding: "0 20px 40px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
        <button onClick={v.back} style={{ width: "40px", height: "40px", marginLeft: "-8px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>Centro de ayuda</h1>
      </div>
      <h2 style={{ margin: "8px 0 16px", fontSize: "24px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.025em" }}>
        ¿En qué te podemos ayudar?
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "48px", padding: "0 16px", marginBottom: "16px", borderRadius: "100px", background: "#F7F7F9", border: "1.5px solid #F7F7F9" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input value={v.helpQ ?? ""} onChange={v.onHelpQ} placeholder="Buscar: reembolso, cancelar, vacunas…" style={{ flex: "1", minWidth: "0", border: "none", background: "transparent", outline: "none", fontSize: "14px", fontWeight: "500", color: "#0F0F12" }} />
      </div>
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", margin: "0 -20px 16px", padding: "0 20px" }}>
        {list(v.helpTopics).map((c: any, $i: number) => (
          <button key={$i} onClick={c?.onClick} style={sx(`flex:none;height:36px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
            {c?.label}
          </button>
        ))}
      </div>
      <div style={{ border: "1px solid #EFEFF2", borderRadius: "20px", padding: "0 16px", marginBottom: "28px" }}>
        {list(v.helpFaqs).map((f: any, $i: number) => (
          <div key={$i} style={sx(`border-bottom:${f?.border ?? ""}`)}>
            <button onClick={f?.onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "16px 0", border: "none", background: "none", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
              <span style={{ flex: "1", fontSize: "14px", fontWeight: "700", color: "#0F0F12", textWrap: "pretty" }}>{f?.q}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2.2" strokeLinecap="round" style={sx(`flex:none;transition:transform .2s;transform:${f?.rot ?? ""}`)}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {f?.open ? (
              <p style={{ margin: "-4px 0 16px", fontSize: "13px", lineHeight: "1.55", color: "#56565F", textWrap: "pretty", animation: "fade .2s" }}>
                {f?.a}
              </p>
            ) : null}
          </div>
        ))}
        {v.helpEmpty ? (
          <p style={{ margin: "0", padding: "24px 0", textAlign: "center", fontSize: "13px", color: "#7E7E87" }}>
            No encontramos resultados. Escríbenos y te ayudamos.
          </p>
        ) : null}
      </div>
      <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>¿Necesitas más ayuda?</h2>
      <button onClick={v.helpChat} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", marginBottom: "10px", borderRadius: "20px", border: "none", background: "#4700D8", color: "#FFFFFF", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
        <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span style={{ flex: "1" }}>
          <span style={{ display: "block", fontSize: "15px", fontWeight: "800" }}>Chatear con soporte</span>
          <span style={{ display: "block", fontSize: "12px", fontWeight: "500", opacity: ".85" }}>Respondemos en ~5 min · 8:00 a 22:00</span>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <button onClick={v.helpCall} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "14px 16px", borderRadius: "20px", border: "1px solid #E3E3E7", background: "#FFFFFF", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>
            <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F0F12" }}>Llamar</span>
            <span style={{ display: "block", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>+56 2 2345 6789</span>
          </span>
        </button>
        <button onClick={v.helpMail} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "14px 16px", borderRadius: "20px", border: "1px solid #E3E3E7", background: "#FFFFFF", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
          <span>
            <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F0F12" }}>Correo</span>
            <span style={{ display: "block", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>ayuda@petsocial.cl</span>
          </span>
        </button>
      </div>
    </div>
  )
}
