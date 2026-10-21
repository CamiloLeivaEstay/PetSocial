import { list, sx, txt, type Vals } from '../lib/view'

export function BookingScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Reservar" style={{ padding: "0 20px 120px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
        <button onClick={v.bookingBack} style={{ width: "40px", height: "40px", marginLeft: "-8px", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>{v.bookingTitle}</h1>
      </div>
      <div style={{ display: "flex", gap: "8px", paddingBottom: "18px" }}>
        {list(v.stepper).map((s: any, $i: number) => (
          <div key={$i} style={sx(`flex:1;height:3px;border-radius:100px;transition:background .3s;background:${s?.bg ?? ""}`)} />
        ))}
      </div>
      {v.isStep12 ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", border: "1px solid #EFEFF2", borderRadius: "14px", marginBottom: "24px" }}>
          <img src={v.pv?.cover} alt="" style={{ width: "56px", height: "56px", borderRadius: "14px", objectFit: "cover" }} />
          <div style={{ minWidth: "0" }}>
            <p style={{ margin: "0", fontSize: "14px", fontWeight: "800" }}>{v.pv?.name}</p>
            <p style={{ margin: "0 0 2px", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{txt(v.pv?.comuna)}{" · "}{txt(v.pv?.km)}{" km"}</p>
            <p style={{ margin: "0", fontSize: "11px", fontWeight: "700" }}>
              <span style={{ color: "#FFDC6E" }}>★</span>
              {" "}{txt(v.pv?.rating)}{" "}
              <span style={{ color: "#7E7E87", fontWeight: "500" }}>({txt(v.pv?.reviews)})</span>
            </p>
          </div>
        </div>
      ) : null}
      {v.isStep1 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <section>
            <h2 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>¿Para cuál mascota?</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {list(v.petOpts).map((o: any, $i: number) => (
                <button key={$i} onClick={o?.onClick} style={sx(`display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;text-align:left;cursor:pointer;background:${o?.bg ?? ""};border:${o?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                  <img src={o?.photo} alt="" style={{ width: "44px", height: "44px", borderRadius: "100px", objectFit: "cover" }} />
                  <div style={{ flex: "1" }}>
                    <p style={{ margin: "0", fontSize: "15px", fontWeight: "800", color: "#0F0F12" }}>{o?.name}</p>
                    <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{txt(o?.breed)}{" · "}{txt(o?.age)}</p>
                  </div>
                  <span style={sx(`width:24px;height:24px;border-radius:100px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:13px;font-weight:800;background:${o?.checkBg ?? ""};border:${o?.checkBorder ?? ""}`)}>
                    {o?.check}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section>
            <h2 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Selecciona fecha</h2>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", margin: "0 -20px", padding: "0 20px" }}>
              {list(v.days).map((d: any, $i: number) => (
                <button key={$i} onClick={d?.onClick} style={sx(`flex:none;width:64px;padding:12px 0;border-radius:14px;cursor:pointer;text-align:center;background:${d?.bg ?? ""};color:${d?.color ?? ""};border:1px solid ${d?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                  <span style={{ display: "block", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: ".08em", opacity: ".75", marginBottom: "2px" }}>
                    {d?.dow}
                  </span>
                  <span style={{ display: "block", fontSize: "14px", fontWeight: "800" }}>{d?.num}</span>
                </button>
              ))}
            </div>
          </section>
          {v.hasDay ? (
            <section>
              <h2 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Selecciona horario</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
                {list(v.times).map((t: any, $i: number) => (
                  <button key={$i} onClick={t?.onClick} style={sx(`padding:10px 0;border-radius:14px;font-weight:700;font-size:13px;cursor:pointer;background:${t?.bg ?? ""};color:${t?.color ?? ""};border:1px solid ${t?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                    {t?.label}
                  </button>
                ))}
              </div>
            </section>
          ) : null}
          <section>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#34343D", marginBottom: "8px" }}>
              Notas adicionales (opcional)
            </label>
            <textarea rows={3} value={v.notes ?? ""} onChange={v.onNotes} placeholder="Instrucciones especiales, medicamentos, preferencias..." style={{ width: "100%", padding: "12px", fontSize: "13px", fontWeight: "500", border: "1px solid #E3E3E7", borderRadius: "14px", resize: "none", outline: "none" }} className="focus-2" />
          </section>
        </div>
      ) : null}
      {v.isStep2 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ padding: "16px", border: "1px solid #EFEFF2", borderRadius: "14px" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: "15px", fontWeight: "800" }}>Resumen</h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
              <span style={{ color: "#34343D" }}>{txt(v.pv?.name)}{" · "}{txt(v.selPetName)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px", color: "#56565F" }}>
              <span>{v.whenLabel}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
              <span style={{ color: "#34343D" }}>{"Precio por "}{txt(v.pv?.unit)}</span>
              <b>{v.pv?.price}</b>
            </div>
            {list(v.exSel).map((x: any, $i: number) => (
              <div key={$i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", fontSize: "14px", marginBottom: "8px", animation: "fade .2s" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: "0", color: "#34343D" }}>
                  <button onClick={x?.remove} title="Quitar" style={{ width: "18px", height: "18px", flex: "none", borderRadius: "100px", border: "none", background: "#EFEFF2", color: "#56565F", fontSize: "9px", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                    ✕
                  </button>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x?.label}</span>
                </span>
                <b style={{ flex: "none" }}>{x?.price}</b>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "12px" }}>
              <span style={{ color: "#34343D" }}>Cargo por servicio</span>
              <b>$900</b>
            </div>
            <div style={{ borderTop: "1px solid #EFEFF2", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "16px", fontWeight: "800" }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: "800", color: "#4700D8" }}>{v.total}</span>
            </div>
          </div>
          {v.exAvailable ? (
            <button onClick={v.openExtras} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", borderRadius: "20px", border: "1.5px solid #E5DAFB", background: "#F4EEFE", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-10 tap-96">
              <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", background: "#4700D8", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: "20px", fontWeight: "700" }}>
                +
              </span>
              <span style={{ flex: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "14px", fontWeight: "800", color: "#0F0F12" }}>{v.exCardTitle}</span>
                <span style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#56565F" }}>{v.exCardSub}</span>
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2.2" strokeLinecap="round" style={{ flex: "none" }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ) : null}
          <section>
            <h2 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Método de pago</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {list(v.cardOpts).map((c: any, $i: number) => (
                <button key={$i} onClick={c?.onClick} style={sx(`display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;text-align:left;cursor:pointer;background:${c?.bgRow ?? ""};border:${c?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                  <span style={sx(`width:48px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:10px;font-weight:800;letter-spacing:.08em;background:${c?.bg ?? ""}`)}>
                    {c?.brand}
                  </span>
                  <div style={{ flex: "1" }}>
                    <p style={{ margin: "0", fontSize: "14px", fontWeight: "700", color: "#0F0F12" }}>{"•••• "}{txt(c?.last4)}</p>
                    <p style={{ margin: "0", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{"Vence "}{txt(c?.exp)}</p>
                  </div>
                  <span style={sx(`width:24px;height:24px;border-radius:100px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:13px;font-weight:800;background:${c?.checkBg ?? ""};border:${c?.checkBorder ?? ""}`)}>
                    {c?.check}
                  </span>
                </button>
              ))}
              <button onClick={v.openCardSheet} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", borderRadius: "14px", border: "2px dashed #9D7AF0", background: "rgba(244,238,254,.5)", color: "#4700D8", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
                + Añadir nueva tarjeta
              </button>
            </div>
          </section>
        </div>
      ) : null}
      {v.isStep3 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ padding: "6px 12px", borderRadius: "100px", background: "#D1FAE5", color: "#047857", fontSize: "12px", fontWeight: "800" }}>
              ✓ Reserva confirmada
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
              Tu reserva fue realizada con éxito.
            </h1>
            <p style={{ margin: "0", fontSize: "13px", color: "#56565F", lineHeight: "1.6", textWrap: "pretty" }}>
              El servicio aprobará la solicitud dentro de las próximas horas. Recibirás una notificación cuando esté confirmada.
            </p>
          </div>
          <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #EFEFF2" }}>
            <div style={{ padding: "20px", textAlign: "center", color: "#FFFFFF", background: "linear-gradient(135deg,#5418B2,#E83868)" }}>
              <p style={{ margin: "0 0 4px", fontSize: "10px", fontWeight: "700", letterSpacing: ".16em", textTransform: "uppercase", opacity: ".85" }}>
                Código de reserva
              </p>
              <p style={{ margin: "0", font: "800 24px 'JetBrains Mono',monospace", letterSpacing: ".18em" }}>{v.code}</p>
            </div>
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#7E7E87", fontWeight: "500" }}>Proveedor</span>
                <b>{v.pv?.name}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#7E7E87", fontWeight: "500" }}>Mascota</span>
                <b>{v.selPetName}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#7E7E87", fontWeight: "500" }}>Fecha</span>
                <b>{v.whenLabel}</b>
              </div>
              {v.exHasSel ? (
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                  <span style={{ color: "#7E7E87", fontWeight: "500", flex: "none" }}>Adicionales</span>
                  <b style={{ textAlign: "right" }}>{v.exNames}</b>
                </div>
              ) : null}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#7E7E87", fontWeight: "500" }}>Pago</span>
                <b>{"•••• "}{txt(v.selCard?.last4)}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #EFEFF2", paddingTop: "10px", marginTop: "2px" }}>
                <span style={{ fontSize: "14px", fontWeight: "800" }}>Total</span>
                <span style={{ fontSize: "18px", fontWeight: "800", color: "#4700D8" }}>{v.total}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "14px", background: "#FFF3CC" }}>
            <span style={{ fontSize: "16px" }}>🪙</span>
            <p style={{ margin: "0", fontSize: "12px", fontWeight: "700", color: "#B8951F" }}>Ganaste +50 PetCoins con esta reserva</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={v.goChatProvider} style={{ height: "52px", borderRadius: "28px", border: "none", background: "#4700D8", color: "#FFFFFF", fontWeight: "700", fontSize: "16px", cursor: "pointer", boxShadow: "0 6px 24px rgba(71,0,216,.28)", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
              Mensaje al proveedor
            </button>
            <button onClick={v.goReservations} style={{ height: "52px", borderRadius: "28px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#34343D", fontWeight: "700", fontSize: "16px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-11 tap-96">
              Ver mis reservas
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
