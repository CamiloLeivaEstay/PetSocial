import { txt, type Vals } from '../lib/view'

export function CertQrOverlay({ v }: { v: Vals }) {
  return (
    <div data-screen-label="QR certificado" style={{ position: "absolute", inset: "0", zIndex: "20", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center", animation: "fadeUp .3s cubic-bezier(.2,.8,.2,1) both" }}>
      <button onClick={v.certCloseQr} style={{ position: "absolute", top: "calc(var(--sb) + 9px)", right: "16px", width: "40px", height: "40px", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s" }} className="tap-94">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <img src={v.cv?.petPhoto} alt="" style={{ width: "64px", height: "64px", borderRadius: "100px", objectFit: "cover", marginBottom: "10px" }} />
      <p style={{ margin: "0", fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" }}>{v.cv?.petName}</p>
      <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#7E7E87", fontWeight: "500" }}>{txt(v.cv?.typeShort)}{" · "}{txt(v.cv?.proName)}</p>
      <div style={{ margin: "22px 0 16px", padding: "14px", borderRadius: "24px", border: "1px solid #EFEFF2", boxShadow: "0 8px 28px rgba(15,15,18,.08)", animation: "popIn .45s cubic-bezier(.34,1.56,.64,1) .1s both" }}>
        <img src={v.cv?.qr} alt="Código QR de verificación" style={{ width: "220px", height: "220px", display: "block" }} />
      </div>
      <p style={{ margin: "0", font: "700 17px 'JetBrains Mono',monospace", letterSpacing: ".06em" }}>{v.cv?.folio}</p>
      <p style={{ margin: "4px 0 18px", fontSize: "13px", fontWeight: "700", color: "#047857" }}>{"Válido hasta "}{txt(v.cv?.until)}</p>
      <p style={{ margin: "0", maxWidth: "280px", fontSize: "12px", lineHeight: "1.5", color: "#7E7E87", textWrap: "pretty" }}>
        Muestra este código en el counter. El personal puede verificarlo en petsocial.cl/verificar con el folio.
      </p>
    </div>
  )
}
