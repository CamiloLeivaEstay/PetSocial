import { list, sx, txt, type Vals } from '../lib/view'

export function ReservationsScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Reservas" style={{ padding: "8px 20px 110px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <h1 style={{ margin: "4px 0 16px", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.03em" }}>Mis reservas</h1>
      <div style={{ display: "flex", gap: "4px", padding: "4px", background: "#EFEFF2", borderRadius: "100px", marginBottom: "16px" }}>
        {list(v.resTabs).map((t: any, $i: number) => (
          <button key={$i} onClick={t?.onClick} style={sx(`flex:1;padding:8px 0;border-radius:100px;border:none;font-size:13px;font-weight:700;cursor:pointer;background:${t?.bg ?? ""};color:${t?.color ?? ""};box-shadow:${t?.shadow ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
            {t?.label}
          </button>
        ))}
      </div>
      {v.resShowSub ? (
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", margin: "0 -20px 16px", padding: "0 20px" }}>
          {list(v.resSubs).map((c: any, $i: number) => (
            <button key={$i} onClick={c?.onClick} style={sx(`flex:none;display:flex;align-items:center;gap:6px;height:36px;padding:0 6px 0 14px;border-radius:100px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;background:${c?.bg ?? ""};color:${c?.color ?? ""};border:1px solid ${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
              {txt(c?.label)}
              <span style={sx(`min-width:22px;height:22px;padding:0 6px;border-radius:100px;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;background:${c?.countBg ?? ""}`)}>
                {c?.count}
              </span>
            </button>
          ))}
        </div>
      ) : null}
      {v.resCancelNote ? (
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px 14px", marginBottom: "12px", borderRadius: "14px", background: "#F7F7F9" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "1px" }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.5", color: "#56565F", fontWeight: "500", textWrap: "pretty" }}>
            Las reservas canceladas se guardan por 30 días y luego se eliminan automáticamente.
          </p>
        </div>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {list(v.resList).map((r: any, $i: number) => (
          <div key={$i} onClick={r?.onClick} style={sx(`padding:16px;background:#FFFFFF;border:1px solid #EFEFF2;border-radius:20px;cursor:${r?.cursor ?? ""};animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${r?.delay ?? ""}`)}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <img src={r?.cover} alt="" style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover" }} />
              <div style={{ flex: "1", minWidth: "0" }}>
                <p style={{ margin: "0", fontSize: "14px", fontWeight: "800" }}>{r?.name}</p>
                <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{txt(r?.service)}{" · "}{txt(r?.pet)}</p>
              </div>
              <span style={sx(`padding:4px 10px;border-radius:100px;font-size:11px;font-weight:700;background:${r?.badgeBg ?? ""};color:${r?.badgeColor ?? ""}`)}>
                {r?.badge}
              </span>
            </div>
            <div style={{ display: "flex", gap: "16px", paddingTop: "12px", borderTop: "1px solid #EFEFF2", fontSize: "12px", color: "#56565F", fontWeight: "500" }}>
              <span>{"📅 "}{txt(r?.date)}</span>
              <span>{"🕐 "}{txt(r?.time)}</span>
              <span>{"📍 "}{txt(r?.comuna)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #EFEFF2" }}>
              <span style={{ fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{r?.priceLabel}</span>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "#4700D8" }}>{r?.price}</span>
            </div>
            {r?.isCancelled ? (
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "12px", padding: "10px 12px", borderRadius: "14px", background: "#F7F7F9" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7E7E87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.4", color: "#56565F", fontWeight: "500" }}>{r?.cancelNote}</p>
              </div>
            ) : null}
            {r?.isPending ? (
              <>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "12px", padding: "12px", borderRadius: "14px", background: "#FFFBEB" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "1px" }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.45", color: "#92400E", fontWeight: "500", textWrap: "pretty" }}>
                    {txt(r?.name)}{" tiene hasta 2 horas para confirmar. Si no acepta, no se realiza ningún cobro."}
                  </p>
                </div>
                <button onClick={r?.onCancelReq} style={{ width: "100%", height: "40px", marginTop: "10px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#56565F", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-12 tap-96">
                  Cancelar solicitud
                </button>
              </>
            ) : null}
            {r?.isAccepted ? (
              <button onClick={r?.onScheduled} style={{ width: "100%", height: "40px", marginTop: "12px", borderRadius: "100px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
                Ver detalles
              </button>
            ) : null}
            {r?.isDone ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                <button onClick={r?.onDetail} style={{ height: "40px", borderRadius: "100px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
                  Ver detalles
                </button>
                {r?.canReview ? (
                  <button onClick={r?.onReview} style={{ height: "40px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#4700D8", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
                    ★ Dejar reseña
                  </button>
                ) : null}
                {r?.reviewed ? (
                  <span style={{ height: "40px", borderRadius: "100px", background: "#D1FAE5", color: "#047857", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    ✓ Reseña publicada
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {v.resEmpty ? (
        <div style={{ textAlign: "center", padding: "56px 0" }}>
          <p style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800" }}>Sin reservas pasadas</p>
          <p style={{ margin: "0", fontSize: "13px", color: "#7E7E87" }}>Acá aparecerán tus servicios completados</p>
        </div>
      ) : null}
    </div>
  )
}
