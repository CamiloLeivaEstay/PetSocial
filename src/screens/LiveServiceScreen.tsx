import { Fragment } from 'react'
import { list, sx, txt, type Vals } from '../lib/view'

export function LiveServiceScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Servicio en vivo" style={sx(`min-height:100%;background:#F7F7F9;padding-bottom:${v.livePadBottom ?? ""};animation:screenIn .38s cubic-bezier(.2,.8,.2,1) both`)}>
      <div style={{ position: "relative", height: "280px", overflow: "hidden", background: "#E8EDF2" }}>
        <div style={{ position: "absolute", left: "0", right: "0", top: "46%", height: "18px", background: "#FFFFFF" }} />
        <div style={{ position: "absolute", left: "0", right: "0", top: "74%", height: "10px", background: "#FFFFFF" }} />
        <div style={{ position: "absolute", top: "0", bottom: "0", left: "26%", width: "14px", background: "#FFFFFF" }} />
        <div style={{ position: "absolute", top: "0", bottom: "0", left: "72%", width: "18px", background: "#FFFFFF" }} />
        <div style={{ position: "absolute", left: "32%", top: "14%", width: "34%", height: "26%", borderRadius: "14px", background: "#DDEBDD" }} />
        <div style={{ position: "absolute", left: "78%", top: "54%", width: "20%", height: "16%", borderRadius: "14px", background: "#DDEBDD" }} />
        <div style={{ position: "absolute", left: "62%", top: "58%", width: "0", height: "0" }}>
          {v.live?.isLive ? (
            <span style={{ position: "absolute", left: "-40px", top: "-40px", width: "80px", height: "80px", borderRadius: "100px", background: "rgba(71,0,216,.25)", animation: "livePulse 2s ease-out infinite" }} />
          ) : null}
          <img src={v.live?.petPhoto} alt="" style={{ position: "absolute", left: "-28px", top: "-28px", width: "56px", height: "56px", borderRadius: "100px", objectFit: "cover", border: "3px solid #FFFFFF", boxShadow: "0 6px 20px rgba(15,15,18,.2)" }} />
          <img src={v.live?.provCover} alt="" style={{ position: "absolute", left: "14px", top: "10px", width: "28px", height: "28px", borderRadius: "100px", objectFit: "cover", border: "2px solid #FFFFFF", boxShadow: "0 2px 8px rgba(15,15,18,.15)" }} />
        </div>
        <div style={{ position: "absolute", top: "calc(var(--sb) + 9px)", left: "16px", right: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={v.back} style={{ width: "40px", height: "40px", borderRadius: "100px", border: "none", background: "#FFFFFF", boxShadow: "0 4px 16px rgba(15,15,18,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span style={sx(`display:flex;align-items:center;gap:8px;height:32px;padding:0 14px;border-radius:100px;font-size:12px;font-weight:800;letter-spacing:.04em;box-shadow:0 4px 16px rgba(15,15,18,0.08);background:${v.live?.pillBg ?? ""};color:${v.live?.pillColor ?? ""}`)}>
            <span style={sx(`width:8px;height:8px;border-radius:100px;background:${v.live?.pillDot ?? ""}`)} />
            {txt(v.live?.pill)}
          </span>
        </div>
      </div>
      <div style={{ position: "relative", marginTop: "-28px", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "12px 20px 20px", boxShadow: "0 -4px 20px rgba(15,15,18,.06)" }}>
        <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "#E3E3E7", margin: "0 auto 16px" }} />
        <p style={sx(`margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${v.live?.eyebrowColor ?? ""}`)}>
          {v.live?.eyebrow}
        </p>
        <h1 style={{ margin: "0 0 16px", fontSize: "24px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.025em", color: "#0F0F12", textWrap: "balance" }}>
          {v.live?.title}
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "6px", marginBottom: "8px" }}>
          {list(v.liveSteps).map((st: any, $i: number) => (
            <div key={$i} style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <span style={sx(`height:4px;border-radius:100px;transition:background .4s;background:${st?.bar ?? ""}`)} />
              <span style={sx(`font-size:10px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${st?.color ?? ""}`)}>
                {st?.label}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #EFEFF2" }}>
          <img src={v.live?.provCover} alt="" style={{ width: "44px", height: "44px", flex: "none", borderRadius: "14px", objectFit: "cover" }} />
          <div style={{ flex: "1", minWidth: "0" }}>
            <p style={{ margin: "0", fontSize: "14px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {v.live?.provName}
            </p>
            <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{v.live?.provSub}</p>
          </div>
          <button onClick={v.liveCall} style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", border: "1px solid #E3E3E7", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#34343D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          {v.live?.canChat ? (
            <button onClick={v.liveFocusChat} style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", border: "none", background: "#4700D8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      {v.live?.isScheduled ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px 20px 0" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "16px", borderRadius: "20px", background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
            <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <div style={{ flex: "1", minWidth: "0" }}>
              <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "800", color: "#065F46" }}>No te cobraremos nada todavía</p>
              <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "#047857", textWrap: "pretty" }}>
                {"El cobro se hace recién cuando "}{txt(v.live?.provName)}{" inicie el servicio. Puedes cancelar gratis hasta 24 h antes."}
              </p>
            </div>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "16px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: "800" }}>Detalle de la reserva</p>
            {list(v.liveSched).map((x: any, $i: number) => (
              <div key={$i} style={sx(`display:flex;justify-content:space-between;gap:12px;padding:10px 0;font-size:13px;border-bottom:${x?.border ?? ""}`)}>
                <span style={{ color: "#7E7E87", fontWeight: "500", flex: "none" }}>{x?.k}</span>
                <span style={{ textAlign: "right", fontWeight: "700", color: "#0F0F12" }}>{x?.v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0 4px", borderTop: "1px solid #EFEFF2" }}>
              <span style={{ fontSize: "14px", fontWeight: "800" }}>Total estimado</span>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#4700D8" }}>{v.live?.total}</span>
            </div>
            <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>
              {"Se cobrará a tu tarjeta "}{txt(v.live?.card)}{" al comenzar"}
            </p>
          </div>
          <button onClick={v.liveCancelRes} style={{ width: "100%", height: "44px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#56565F", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-12 tap-96">
            Cancelar reserva
          </button>
        </div>
      ) : null}
      {v.live?.isDone ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px 20px 0" }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <img src={v.live?.petPhoto} alt="" style={{ width: "40px", height: "40px", borderRadius: "100px", objectFit: "cover" }} />
              <div style={{ flex: "1", minWidth: "0" }}>
                <p style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>{"Ficha de "}{txt(v.live?.petName)}{" actualizada"}</p>
                <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>
                  {"Por "}{txt(v.live?.provName)}{" · "}{txt(v.live?.doneAt)}
                </p>
              </div>
              <span style={{ padding: "4px 10px", borderRadius: "100px", background: "#D1FAE5", color: "#047857", fontSize: "11px", fontWeight: "700" }}>
                Nuevo
              </span>
            </div>
            {list(v.liveRecord).map((x: any, $i: number) => (
              <div key={$i} style={sx(`display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #EFEFF2;font-size:13px;border-bottom:${x?.border ?? ""}`)}>
                <span style={{ color: "#7E7E87", fontWeight: "500", flex: "none" }}>{x?.k}</span>
                <span style={{ textAlign: "right", fontWeight: "700", color: "#0F0F12", textWrap: "pretty" }}>
                  {txt(x?.v)}{" "}
                  <span style={{ fontWeight: "500", color: "#A5A5AD" }}>{x?.note}</span>
                </span>
              </div>
            ))}
            <button onClick={v.livePetFile} style={{ width: "100%", height: "42px", marginTop: "12px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#4700D8", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
              {"Ver ficha de "}{txt(v.live?.petName)}
            </button>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <p style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>Pago</p>
              <span style={{ padding: "4px 10px", borderRadius: "100px", background: "#D1FAE5", color: "#047857", fontSize: "11px", fontWeight: "700" }}>
                Pagado
              </span>
            </div>
            {list(v.livePay).map((x: any, $i: number) => (
              <div key={$i} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid #EFEFF2", fontSize: "13px" }}>
                <span style={{ color: "#7E7E87", fontWeight: "500" }}>{x?.k}</span>
                <span style={{ fontWeight: "700" }}>{x?.v}</span>
              </div>
            ))}
            {v.live?.canTip ? (
              <div style={{ padding: "12px 0", borderBottom: "1px solid #EFEFF2" }}>
                <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#7E7E87", fontWeight: "500" }}>
                  {"Propina para "}{txt(v.live?.staff)}{" (opcional)"}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "6px" }}>
                  {list(v.liveTips).map((t: any, $i: number) => (
                    <button key={$i} onClick={t?.onClick} style={sx(`height:36px;border-radius:100px;font-size:12px;font-weight:700;cursor:pointer;background:${t?.bg ?? ""};color:${t?.color ?? ""};border:1px solid ${t?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                      {t?.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0 4px" }}>
              <span style={{ fontSize: "14px", fontWeight: "800" }}>Total</span>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#4700D8" }}>{v.live?.total}</span>
            </div>
            <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{"Visa •••• 4242 · Boleta "}{txt(v.live?.receipt)}</p>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "16px", textAlign: "center" }}>
            <p style={{ margin: "0 0 10px", fontSize: "15px", fontWeight: "800" }}>{v.live?.rateTitle}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "12px" }}>
              {list(v.liveStars).map((st: any, $i: number) => (
                <button key={$i} onClick={st?.onClick} style={sx(`width:40px;height:40px;border:none;background:none;padding:0;cursor:pointer;font-size:30px;line-height:1;color:${st?.color ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                  ★
                </button>
              ))}
            </div>
            {v.live?.showRateBtn ? (
              <button onClick={v.liveRate} style={sx(`width:100%;height:48px;border-radius:100px;border:none;background:${v.live?.rateBg ?? ""};color:#FFFFFF;font-size:15px;font-weight:700;cursor:pointer;transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                Enviar calificación
              </button>
            ) : null}
            {v.live?.canReview ? (
              <button onClick={v.liveReview} style={{ width: "100%", height: "44px", marginTop: "8px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#4700D8", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
                Escribir reseña con fotos
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
      <section style={{ padding: "16px 20px 0" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "16px 16px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h2 style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>Historial del servicio</h2>
            <span style={{ fontSize: "11px", fontWeight: "600", color: "#A5A5AD" }}>{v.live?.dateLabel}</span>
          </div>
          {list(v.liveFeed).map((f: any, $i: number) => (
            <Fragment key={$i}>
              {f?.isEvent ? (
                <div style={{ display: "flex", gap: "12px", animation: "fade .3s" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", width: "14px" }}>
                    <span style={sx(`width:12px;height:12px;margin-top:3px;border-radius:100px;flex:none;background:${f?.dot ?? ""};box-shadow:0 0 0 3px ${f?.ring ?? ""}`)} />
                    <span style={sx(`flex:1;width:2px;background:#EFEFF2;margin:4px 0;opacity:${f?.railOpacity ?? ""}`)} />
                  </div>
                  <div style={{ flex: "1", minWidth: "0", paddingBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                      <p style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#0F0F12" }}>{f?.title}</p>
                      <span style={{ fontSize: "11px", color: "#A5A5AD", fontWeight: "600", flex: "none" }}>{f?.time}</span>
                    </div>
                    <p style={{ margin: "2px 0 0", fontSize: "12px", lineHeight: "1.45", color: "#56565F", textWrap: "pretty" }}>{f?.text}</p>
                    {f?.photo ? (
                      <img src={f?.photo} alt="" style={{ width: "100%", height: "150px", marginTop: "10px", borderRadius: "14px", objectFit: "cover", display: "block" }} />
                    ) : null}
                  </div>
                </div>
              ) : null}
              {f?.isMsg ? (
                <div style={sx(`display:flex;flex-direction:column;align-items:${f?.align ?? ""};gap:3px;padding:0 0 14px 26px;animation:fade .3s`)}>
                  <div style={sx(`max-width:82%;padding:10px 14px;font-size:13px;line-height:1.45;background:${f?.bg ?? ""};color:${f?.color ?? ""};border-radius:${f?.radius ?? ""};border:${f?.border ?? ""}`)}>
                    {txt(f?.text)}
                    {f?.photo ? (
                      <img src={f?.photo} alt="" style={{ width: "180px", maxWidth: "100%", height: "130px", marginTop: "8px", borderRadius: "10px", objectFit: "cover", display: "block" }} />
                    ) : null}
                  </div>
                  <span style={{ fontSize: "10px", color: "#A5A5AD", fontWeight: "600" }}>{txt(f?.who)}{" · "}{txt(f?.time)}</span>
                </div>
              ) : null}
            </Fragment>
          ))}
          {v.liveTyping ? (
            <div style={{ display: "flex", gap: "4px", padding: "0 0 14px 26px" }}>
              <div style={{ display: "flex", gap: "4px", padding: "12px 14px", background: "#F7F7F9", borderRadius: "20px 20px 20px 6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "#A5A5AD", animation: "dot 1s infinite" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "#A5A5AD", animation: "dot 1s .15s infinite" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "#A5A5AD", animation: "dot 1s .3s infinite" }} />
              </div>
            </div>
          ) : null}
          {v.live?.isDone ? (
            <p style={{ margin: "0", padding: "4px 0 8px", textAlign: "center", fontSize: "11px", fontWeight: "600", color: "#A5A5AD" }}>
              Chat cerrado · queda guardado en este historial
            </p>
          ) : null}
          {v.live?.isScheduled ? (
            <p style={{ margin: "0", padding: "4px 0 8px", textAlign: "center", fontSize: "11px", fontWeight: "600", color: "#A5A5AD" }}>
              El seguimiento en vivo se activa cuando comience el servicio
            </p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
