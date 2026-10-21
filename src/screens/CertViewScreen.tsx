import { list, sx, txt, type Vals } from '../lib/view'

export function CertViewScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Certificado emitido" style={{ minHeight: "100%", background: "#F7F7F9", padding: "0 20px 40px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
        <button onClick={v.back} style={{ width: "40px", height: "40px", marginLeft: "-8px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s" }} className="tap-94">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 style={{ margin: "0", flex: "1", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>Certificado de viaje</h1>
        <span style={sx(`padding:4px 10px;border-radius:100px;font-size:11px;font-weight:700;background:${v.cv?.pillBg ?? ""};color:${v.cv?.pillColor ?? ""}`)}>
          {v.cv?.pill}
        </span>
      </div>
      {v.cv?.issued ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "14px", marginTop: "4px", borderRadius: "20px", background: "#ECFDF5", border: "1px solid #A7F3D0", animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
          <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .45s cubic-bezier(.34,1.56,.64,1) both" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
          <div style={{ flex: "1", minWidth: "0" }}>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "800", color: "#065F46" }}>Listo para presentar</p>
            <p style={{ margin: "0", fontSize: "12px", fontWeight: "500", color: "#047857" }}>
              {"Válido hasta "}{txt(v.cv?.until)}{" · "}{txt(v.cv?.daysLeft)}
            </p>
          </div>
        </div>
      ) : null}
      {v.cv?.review ? (
        <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "16px", marginTop: "4px", animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
          <p style={{ margin: "0 0 12px", fontSize: "15px", fontWeight: "800" }}>Estamos preparando tu certificado</p>
          {list(v.certSteps).map((st: any, $i: number) => (
            <div key={$i} style={{ display: "flex", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", width: "22px" }}>
                <span style={sx(`width:22px;height:22px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:11px;font-weight:800;transition:all .3s;background:${st?.dot ?? ""};box-shadow:${st?.ring ?? ""}`)}>
                  {st?.mark}
                </span>
                <span style={sx(`flex:1;width:2px;background:#EFEFF2;margin:3px 0;opacity:${st?.rail ?? ""}`)} />
              </div>
              <div style={{ flex: "1", minWidth: "0", paddingBottom: "12px" }}>
                <p style={sx(`margin:1px 0 0;font-size:13px;font-weight:700;transition:color .3s;color:${st?.color ?? ""}`)}>{st?.t}</p>
                <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87" }}>{st?.sub}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div style={{ position: "relative", overflow: "hidden", margin: "16px 0", background: "#FFFFFF", border: "1px solid #E3E3E7", borderRadius: "20px", boxShadow: "0 8px 28px rgba(15,15,18,.08)", animation: "fadeUp .45s cubic-bezier(.2,.8,.2,1) .08s both" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "14px 16px", background: "#4700D8", color: "#FFFFFF" }}>
          <div>
            <p style={{ margin: "0", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>PetSocial</p>
            <p style={{ margin: "0", fontSize: "10px", fontWeight: "600", color: "#E5DAFB" }}>Documento verificable</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0", font: "600 9px 'JetBrains Mono',monospace", color: "#E5DAFB", letterSpacing: ".1em" }}>FOLIO</p>
            <p style={{ margin: "0", font: "700 12px 'JetBrains Mono',monospace" }}>{v.cv?.folio}</p>
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <p style={{ margin: "0 0 2px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#7E7E87" }}>
            {v.cv?.typeShort}
          </p>
          <h2 style={{ margin: "0 0 14px", fontSize: "17px", fontWeight: "800", lineHeight: "1.25", letterSpacing: "-0.01em", textWrap: "balance" }}>
            {v.cv?.docTitle}
          </h2>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", paddingBottom: "14px", marginBottom: "14px", borderBottom: "1px solid #EFEFF2" }}>
            <img src={v.cv?.petPhoto} alt="" style={{ width: "52px", height: "52px", flex: "none", borderRadius: "100px", objectFit: "cover" }} />
            <div style={{ minWidth: "0" }}>
              <p style={{ margin: "0", fontSize: "16px", fontWeight: "800" }}>{v.cv?.petName}</p>
              <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{v.cv?.petSub}</p>
            </div>
          </div>
          <p style={{ margin: "0 0 8px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#4700D8" }}>
            Mascota
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "10px 12px", marginBottom: "16px" }}>
            {list(v.certDocPet).map((x: any, $i: number) => (
              <div key={$i} style={{ minWidth: "0" }}>
                <p style={{ margin: "0", fontSize: "10px", fontWeight: "600", color: "#7E7E87" }}>{x?.k}</p>
                <p style={{ margin: "1px 0 0", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>{x?.v}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: "0 0 8px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#4700D8" }}>
            Viaje
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "10px 12px", marginBottom: "16px" }}>
            {list(v.certDocTrip).map((x: any, $i: number) => (
              <div key={$i} style={{ minWidth: "0" }}>
                <p style={{ margin: "0", fontSize: "10px", fontWeight: "600", color: "#7E7E87" }}>{x?.k}</p>
                <p style={{ margin: "1px 0 0", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>{x?.v}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: "0 0 16px", padding: "12px", borderRadius: "14px", background: "#F7F7F9", fontSize: "12px", lineHeight: "1.55", color: "#34343D", textWrap: "pretty" }}>
            {v.cv?.declaration}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px" }}>
            <div style={{ flex: "1", minWidth: "0" }}>
              <p style={{ margin: "0 0 4px", fontFamily: "'Brush Script MT','Segoe Script','Snell Roundhand',cursive", fontSize: "28px", lineHeight: "1", color: "#3300A8", whiteSpace: "nowrap", overflow: "hidden" }}>
                {v.cv?.sign}
              </p>
              <div style={{ height: "1px", background: "#C9C9CF", marginBottom: "6px" }} />
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "800" }}>{v.cv?.proName}</p>
              <p style={{ margin: "0", fontSize: "11px", color: "#56565F" }}>{v.cv?.proRole}</p>
              <p style={{ margin: "2px 0 0", font: "500 9px 'JetBrains Mono',monospace", color: "#7E7E87" }}>{v.cv?.proReg}</p>
            </div>
            <div style={{ flex: "none", textAlign: "center" }}>
              <img src={v.cv?.qr} alt="Código QR de verificación" style={{ width: "88px", height: "88px", display: "block", borderRadius: "8px", border: "1px solid #EFEFF2" }} />
              <p style={{ margin: "4px 0 0", fontSize: "9px", fontWeight: "600", color: "#7E7E87" }}>Escanea para verificar</p>
            </div>
          </div>
        </div>
        {v.cv?.review ? (
          <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", background: "rgba(255,255,255,.3)" }}>
            <span style={{ transform: "rotate(-22deg)", padding: "8px 18px", border: "3px solid #F59E0B", borderRadius: "10px", background: "rgba(255,251,235,.92)", color: "#B45309", fontSize: "20px", fontWeight: "800", letterSpacing: ".12em" }}>
              EN REVISIÓN
            </span>
          </div>
        ) : null}
      </div>
      <button onClick={v.certDownload} style={sx(`width:100%;height:52px;border-radius:100px;border:none;display:flex;align-items:center;justify-content:center;gap:8px;color:#FFFFFF;font-size:16px;font-weight:700;cursor:pointer;transition:background-color .3s,transform .15s;background:${v.cv?.dlBg ?? ""}`)} className="tap-98">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {txt(v.cv?.dlLabel)}
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0 24px" }}>
        <button onClick={v.certShare} style={{ height: "46px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#34343D", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s,border-color .2s" }} className="hover-10 tap-96">
          Compartir enlace
        </button>
        <button onClick={v.certShowQr} style={{ height: "46px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#4700D8", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s,border-color .2s" }} className="hover-10 tap-96">
          Mostrar en aeropuerto
        </button>
      </div>
      <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>Cómo presentarlo</h2>
      <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "4px 16px" }}>
        {list(v.certHow).map((x: any, $i: number) => (
          <div key={$i} style={sx(`display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:${x?.border ?? ""}`)}>
            <span style={{ width: "24px", height: "24px", flex: "none", borderRadius: "100px", background: "#F4EEFE", color: "#4700D8", fontSize: "12px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {x?.n}
            </span>
            <p style={{ margin: "2px 0 0", fontSize: "13px", lineHeight: "1.45", color: "#34343D", textWrap: "pretty" }}>{x?.t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
