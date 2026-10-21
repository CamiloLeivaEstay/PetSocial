import { sx, type Vals } from '../lib/view'

export function CardSheet({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "20" }}>
      <div onClick={v.closeCardSheet} style={{ position: "absolute", inset: "0", background: "rgba(15,15,18,.55)", animation: "fade .3s ease" }} />
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "12px 20px max(34px,var(--sab))", animation: "up .42s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "#E3E3E7", margin: "0 auto 16px" }} />
        <h3 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: "800" }}>Nueva tarjeta</h3>
        <div style={sx(`height:120px;border-radius:20px;padding:16px;margin-bottom:18px;color:#FFFFFF;display:flex;flex-direction:column;justify-content:space-between;transition:background .3s;background:${v.cf?.bg ?? ""}`)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "800", letterSpacing: ".04em" }}>{v.cf?.brand}</span>
            <span style={{ width: "32px", height: "22px", borderRadius: "5px", background: "rgba(255,255,255,.35)" }} />
          </div>
          <p style={{ margin: "0", fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", letterSpacing: ".1em" }}>{v.cf?.numShown}</p>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "600", opacity: ".9" }}>
            <span>{v.cf?.nameShown}</span>
            <span>{v.cf?.expShown}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#34343D" }}>
            Número de tarjeta
            <input inputMode="numeric" value={v.cf?.num ?? ""} onChange={v.cfOn?.num} placeholder="1234 5678 9012 3456" style={{ height: "44px", padding: "0 12px", fontSize: "14px", fontWeight: "500", color: "#0F0F12", background: "#F7F7F9", border: "1.5px solid #E3E3E7", borderRadius: "14px", outline: "none", minWidth: "0" }} className="focus-4" />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#34343D" }}>
            Nombre del titular
            <input value={v.cf?.name ?? ""} onChange={v.cfOn?.name} placeholder="Como aparece en la tarjeta" style={{ height: "44px", padding: "0 12px", fontSize: "14px", fontWeight: "500", color: "#0F0F12", background: "#F7F7F9", border: "1.5px solid #E3E3E7", borderRadius: "14px", outline: "none", minWidth: "0" }} className="focus-4" />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#34343D" }}>
              Vencimiento
              <input inputMode="numeric" value={v.cf?.exp ?? ""} onChange={v.cfOn?.exp} placeholder="MM/AA" style={{ height: "44px", padding: "0 12px", fontSize: "14px", fontWeight: "500", color: "#0F0F12", background: "#F7F7F9", border: "1.5px solid #E3E3E7", borderRadius: "14px", outline: "none", minWidth: "0" }} className="focus-4" />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#34343D" }}>
              CVV
              <input inputMode="numeric" type="password" value={v.cf?.cvv ?? ""} onChange={v.cfOn?.cvv} placeholder="•••" style={{ height: "44px", padding: "0 12px", fontSize: "14px", fontWeight: "500", color: "#0F0F12", background: "#F7F7F9", border: "1.5px solid #E3E3E7", borderRadius: "14px", outline: "none", minWidth: "0" }} className="focus-4" />
            </label>
          </div>
          {v.cfError ? (
            <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", color: "#B91C1C" }}>Revisa los datos: número, titular, vencimiento y CVV.</p>
          ) : null}
        </div>
        <button onClick={v.saveCard} style={sx(`width:100%;margin-top:20px;height:52px;border-radius:28px;border:none;color:#FFFFFF;font-weight:700;font-size:16px;cursor:pointer;background:${v.cf?.ctaBg ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
          Guardar tarjeta
        </button>
      </div>
    </div>
  )
}
