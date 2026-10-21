import { list, sx, txt, type Vals } from '../lib/view'

export function PaymentsScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Métodos de pago" style={{ padding: "0 20px 40px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
        <button onClick={v.back} style={{ width: "40px", height: "40px", marginLeft: "-8px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>Métodos de pago</h1>
      </div>
      <div style={sx(`position:relative;height:196px;border-radius:24px;padding:20px;margin:8px 0 28px;color:#FFFFFF;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 32px rgba(71,0,216,.25);background:${v.payDefault?.bg ?? ""}`)}>
        <span style={{ position: "absolute", right: "-40px", top: "-40px", width: "180px", height: "180px", borderRadius: "100px", background: "rgba(255,255,255,.1)" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: ".04em" }}>{v.payDefault?.brand}</span>
          <span style={{ padding: "4px 10px", borderRadius: "100px", background: "rgba(255,255,255,.2)", fontSize: "11px", fontWeight: "700" }}>
            Predeterminada
          </span>
        </div>
        <span style={{ position: "relative", width: "40px", height: "30px", borderRadius: "6px", background: "rgba(255,255,255,.35)" }} />
        <p style={{ position: "relative", margin: "0", fontFamily: "'JetBrains Mono',monospace", fontSize: "18px", fontWeight: "500", letterSpacing: ".12em" }}>
          {"•••• •••• •••• "}{txt(v.payDefault?.last4)}
        </p>
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", opacity: ".9" }}>
          <span>{v.payDefault?.holder}</span>
          <span>{"Vence "}{txt(v.payDefault?.exp)}</span>
        </div>
      </div>
      <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>Tus tarjetas</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
        {list(v.payCards).map((c: any, $i: number) => (
          <div key={$i} style={sx(`display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:20px;background:#FFFFFF;border:${c?.border ?? ""}`)}>
            <span style={sx(`width:48px;height:32px;flex:none;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:10px;font-weight:800;letter-spacing:.04em;background:${c?.bg ?? ""}`)}>
              {c?.brand}
            </span>
            <div style={{ flex: "1", minWidth: "0" }}>
              <p style={{ margin: "0", fontSize: "14px", fontWeight: "700" }}>{txt(c?.label)}{" •••• "}{txt(c?.last4)}</p>
              <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{"Vence "}{txt(c?.exp)}</p>
            </div>
            {c?.isDefault ? (
              <span style={{ padding: "4px 10px", borderRadius: "100px", background: "#F4EEFE", color: "#4700D8", fontSize: "11px", fontWeight: "700" }}>
                Predeterminada
              </span>
            ) : null}
            {c?.notDefault ? (
              <button onClick={c?.makeDefault} style={{ height: "30px", padding: "0 12px", borderRadius: "100px", border: "1px solid #E3E3E7", background: "#FFFFFF", color: "#34343D", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-11 tap-96">
                Usar
              </button>
            ) : null}
            {c?.canDelete ? (
              <button onClick={c?.remove} title="Eliminar" style={{ width: "32px", height: "32px", flex: "none", borderRadius: "100px", border: "none", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-14 tap-96">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            ) : null}
          </div>
        ))}
      </div>
      <button onClick={v.openCardSheet} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", marginBottom: "28px", borderRadius: "14px", border: "2px dashed #9D7AF0", background: "rgba(244,238,254,.5)", color: "#4700D8", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-3 tap-96">
        + Agregar tarjeta
      </button>
      <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "800", letterSpacing: "-0.01em" }}>Últimos pagos</h2>
      <div style={{ border: "1px solid #EFEFF2", borderRadius: "20px", padding: "4px 16px", marginBottom: "16px" }}>
        {list(v.payHistory).map((x: any, $i: number) => (
          <div key={$i} style={sx(`display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:${x?.border ?? ""}`)}>
            <img src={x?.cover} alt="" style={{ width: "36px", height: "36px", flex: "none", borderRadius: "10px", objectFit: "cover" }} />
            <div style={{ flex: "1", minWidth: "0" }}>
              <p style={{ margin: "0", fontSize: "13px", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {x?.name}
              </p>
              <p style={{ margin: "0", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{txt(x?.date)}{" · "}{txt(x?.card)}</p>
            </div>
            <span style={{ fontSize: "14px", fontWeight: "800", color: "#0F0F12" }}>{x?.amount}</span>
          </div>
        ))}
      </div>
      <p style={{ display: "flex", alignItems: "flex-start", gap: "8px", margin: "0", fontSize: "12px", lineHeight: "1.5", color: "#7E7E87" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "2px" }}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Tus datos de pago se guardan cifrados. PetSocial nunca ve el número completo de tu tarjeta.
      </p>
    </div>
  )
}
