import { list, sx, type Vals } from '../lib/view'

export function MessagesScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Mensajes" style={{ padding: "8px 20px 110px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <h1 style={{ margin: "4px 0 16px", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.03em" }}>Mensajes</h1>
      <div style={{ position: "relative", overflow: "hidden", padding: "18px", marginBottom: "24px", borderRadius: "24px", background: "linear-gradient(145deg,#4700D8 0%,#3300A8 100%)", boxShadow: "0 12px 32px rgba(71,0,216,.28)" }}>
        <span style={{ position: "absolute", right: "-48px", top: "-56px", width: "180px", height: "180px", borderRadius: "100px", background: "rgba(255,255,255,.08)" }} />
        <span style={{ position: "absolute", right: "30px", bottom: "-70px", width: "120px", height: "120px", borderRadius: "100px", background: "rgba(157,122,240,.25)" }} />
        <div onClick={v.goPetAI} style={{ position: "relative", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" }}>
          <span style={{ width: "52px", height: "52px", flex: "none", borderRadius: "100px", background: "rgba(255,255,255,.16)", border: "1.5px solid rgba(255,255,255,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <path fill="white" d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6L10 3z" />
              <path fill="white" strokeWidth="1.2" d="M18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13z" />
            </svg>
          </span>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "800", color: "#FFFFFF", letterSpacing: "-0.01em" }}>Pet IA</p>
              <span style={{ display: "flex", alignItems: "center", gap: "5px", padding: "2px 8px", borderRadius: "100px", background: "rgba(255,255,255,.16)", fontSize: "10px", fontWeight: "700", color: "#FFFFFF" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "#34D399" }} />
                24/7
              </span>
            </div>
            <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.4", color: "#E5DAFB", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {v.aiLast}
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" style={{ flex: "none" }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
        <div style={{ position: "relative", display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", margin: "16px -18px 0", padding: "0 18px" }}>
          {list(v.aiPrompts).map((q: any, $i: number) => (
            <button key={$i} onClick={q?.onClick} style={{ flex: "none", height: "34px", padding: "0 14px", borderRadius: "100px", border: "1px solid rgba(255,255,255,.28)", background: "rgba(255,255,255,.12)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-13 tap-96">
              {q?.label}
            </button>
          ))}
        </div>
      </div>
      {v.convActiveHas ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 4px" }}>
            <p style={{ margin: "0", fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#7E7E87" }}>
              Servicios activos
            </p>
            <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "#F35843" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "24px" }}>
            {list(v.convActive).map((t: any, $i: number) => (
              <div key={$i} onClick={t?.onClick} style={sx(`display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #EFEFF2;cursor:pointer;animation:fadeUp .4s cubic-bezier(.2,.8,.2,1) both;animation-delay:${t?.delay ?? ""}`)}>
                <div style={{ position: "relative", flex: "none", width: "48px", height: "48px" }}>
                  <img src={t?.avatar} alt="" style={{ width: "48px", height: "48px", borderRadius: "14px", objectFit: "cover", display: "block", background: "#E5DAFB" }} />
                  {t?.petPhoto ? (
                    <img src={t?.petPhoto} alt="" style={{ position: "absolute", right: "-5px", bottom: "-5px", width: "24px", height: "24px", borderRadius: "100px", objectFit: "cover", border: "2px solid #FFFFFF" }} />
                  ) : null}
                </div>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <p style={sx(`margin:0;font-size:15px;color:#0F0F12;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${t?.nameWeight ?? ""}`)}>
                      {t?.name}
                    </p>
                    <span style={sx(`flex:none;font-size:11px;font-weight:${t?.timeWeight ?? ""};color:${t?.timeColor ?? ""}`)}>{t?.time}</span>
                  </div>
                  {t?.badge ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                      <span style={sx(`padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;white-space:nowrap;background:${t?.badgeBg ?? ""};color:${t?.badgeColor ?? ""}`)}>
                        {t?.badge}
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: "500", color: "#7E7E87", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {t?.sub}
                      </span>
                    </div>
                  ) : null}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                    <p style={sx(`flex:1;min-width:0;margin:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${t?.lastColor ?? ""};font-weight:${t?.lastWeight ?? ""}`)}>
                      {t?.last}
                    </p>
                    {t?.hasUnread ? (
                      <span style={{ flex: "none", minWidth: "20px", height: "20px", padding: "0 6px", borderRadius: "100px", background: "#F35843", color: "#FFFFFF", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t?.unread}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {v.convOtherHas ? (
        <>
          <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#7E7E87" }}>
            Otras conversaciones
          </p>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "24px" }}>
            {list(v.convOther).map((t: any, $i: number) => (
              <div key={$i} onClick={t?.onClick} style={sx(`display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #EFEFF2;cursor:pointer;animation:fadeUp .4s cubic-bezier(.2,.8,.2,1) both;animation-delay:${t?.delay ?? ""}`)}>
                <div style={{ position: "relative", flex: "none", width: "48px", height: "48px" }}>
                  <img src={t?.avatar} alt="" style={{ width: "48px", height: "48px", borderRadius: "14px", objectFit: "cover", display: "block", background: "#E5DAFB" }} />
                  {t?.petPhoto ? (
                    <img src={t?.petPhoto} alt="" style={{ position: "absolute", right: "-5px", bottom: "-5px", width: "24px", height: "24px", borderRadius: "100px", objectFit: "cover", border: "2px solid #FFFFFF" }} />
                  ) : null}
                </div>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <p style={sx(`margin:0;font-size:15px;color:#0F0F12;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${t?.nameWeight ?? ""}`)}>
                      {t?.name}
                    </p>
                    <span style={sx(`flex:none;font-size:11px;font-weight:${t?.timeWeight ?? ""};color:${t?.timeColor ?? ""}`)}>{t?.time}</span>
                  </div>
                  {t?.badge ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                      <span style={sx(`padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;white-space:nowrap;background:${t?.badgeBg ?? ""};color:${t?.badgeColor ?? ""}`)}>
                        {t?.badge}
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: "500", color: "#7E7E87", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {t?.sub}
                      </span>
                    </div>
                  ) : null}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                    <p style={sx(`flex:1;min-width:0;margin:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${t?.lastColor ?? ""};font-weight:${t?.lastWeight ?? ""}`)}>
                      {t?.last}
                    </p>
                    {t?.hasUnread ? (
                      <span style={{ flex: "none", minWidth: "20px", height: "20px", padding: "0 6px", borderRadius: "100px", background: "#F35843", color: "#FFFFFF", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t?.unread}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {v.convPastHas ? (
        <>
          <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#7E7E87" }}>
            Servicios finalizados
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {list(v.convPast).map((t: any, $i: number) => (
              <div key={$i} onClick={t?.onClick} style={sx(`display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #EFEFF2;cursor:pointer;animation:fadeUp .4s cubic-bezier(.2,.8,.2,1) both;animation-delay:${t?.delay ?? ""}`)}>
                <div style={{ position: "relative", flex: "none", width: "48px", height: "48px" }}>
                  <img src={t?.avatar} alt="" style={{ width: "48px", height: "48px", borderRadius: "14px", objectFit: "cover", display: "block", background: "#E5DAFB" }} />
                  {t?.petPhoto ? (
                    <img src={t?.petPhoto} alt="" style={{ position: "absolute", right: "-5px", bottom: "-5px", width: "24px", height: "24px", borderRadius: "100px", objectFit: "cover", border: "2px solid #FFFFFF" }} />
                  ) : null}
                </div>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <p style={sx(`margin:0;font-size:15px;color:#0F0F12;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${t?.nameWeight ?? ""}`)}>
                      {t?.name}
                    </p>
                    <span style={sx(`flex:none;font-size:11px;font-weight:${t?.timeWeight ?? ""};color:${t?.timeColor ?? ""}`)}>{t?.time}</span>
                  </div>
                  {t?.badge ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                      <span style={sx(`padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;white-space:nowrap;background:${t?.badgeBg ?? ""};color:${t?.badgeColor ?? ""}`)}>
                        {t?.badge}
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: "500", color: "#7E7E87", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {t?.sub}
                      </span>
                    </div>
                  ) : null}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                    <p style={sx(`flex:1;min-width:0;margin:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${t?.lastColor ?? ""};font-weight:${t?.lastWeight ?? ""}`)}>
                      {t?.last}
                    </p>
                    {t?.hasUnread ? (
                      <span style={{ flex: "none", minWidth: "20px", height: "20px", padding: "0 6px", borderRadius: "100px", background: "#F35843", color: "#FFFFFF", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t?.unread}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
