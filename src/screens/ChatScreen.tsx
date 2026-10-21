import { list, sx, type Vals } from '../lib/view'

export function ChatScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Chat" style={{ minHeight: "100%", background: "#F7F7F9", display: "flex", flexDirection: "column", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ position: "sticky", top: "0", zIndex: "3", background: "#FFFFFF", borderBottom: "1px solid #EFEFF2", paddingTop: "var(--sb)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "60px", padding: "0 16px" }}>
          <button onClick={v.back} style={{ width: "36px", height: "36px", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {v.chatIsAI ? (
            <div style={{ width: "36px", height: "36px", borderRadius: "100px", background: "linear-gradient(135deg,#6E2BF4,#4700D8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                <path fill="white" d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6L10 3z" />
                <path fill="white" strokeWidth="1.2" d="M18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13z" />
              </svg>
            </div>
          ) : null}
          {v.chatIsProvider ? (
            <img src={v.chat?.avatar} alt="" style={{ width: "36px", height: "36px", borderRadius: "100px", objectFit: "cover" }} />
          ) : null}
          <div>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>{v.chat?.name}</p>
            <p style={{ margin: "0", fontSize: "11px", color: "#7E7E87", fontWeight: "500" }}>{v.chat?.sub}</p>
          </div>
        </div>
        {v.chatIsAI ? (
          <div style={{ padding: "8px 16px", background: "#E7DAFD" }}>
            <p style={{ margin: "0", fontSize: "11px", color: "#4B14B5", fontWeight: "600", textAlign: "center" }}>
              PetAI orienta, no diagnostica. Para urgencias, contacta un veterinario.
            </p>
          </div>
        ) : null}
      </div>
      <div style={{ flex: "1", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {list(v.chatMsgs).map((m: any, $i: number) => (
          <div key={$i} style={sx(`display:flex;gap:10px;justify-content:${m?.justify ?? ""};animation:fade .2s`)}>
            {m?.showAIAvatar ? (
              <div style={{ width: "32px", height: "32px", flex: "none", borderRadius: "100px", background: "linear-gradient(135deg,#6E2BF4,#4700D8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                  <path fill="white" d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6L10 3z" />
                  <path fill="white" strokeWidth="1.2" d="M18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13z" />
                </svg>
              </div>
            ) : null}
            <div style={sx(`max-width:78%;padding:10px 16px;background:${m?.bg ?? ""};color:${m?.color ?? ""};border:${m?.border ?? ""};border-radius:${m?.radius ?? ""}`)}>
              <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.55" }}>{m?.text}</p>
              {m?.suggest ? (
                <div onClick={v.goVets} style={{ marginTop: "12px", padding: "10px", borderRadius: "10px", background: "#ECFDF5", cursor: "pointer" }}>
                  <p style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: "800", color: "#047857" }}>Ver veterinarios cerca →</p>
                  <p style={{ margin: "0", fontSize: "11px", color: "#56565F" }}>Clínicas en tu comuna</p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {v.typing ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "32px" }} />
            <div style={{ background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px 20px 20px 6px", padding: "14px 16px", display: "flex", gap: "4px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "100px", background: "#C9C9CF", animation: "dot .8s infinite" }} />
              <span style={{ width: "7px", height: "7px", borderRadius: "100px", background: "#C9C9CF", animation: "dot .8s .15s infinite" }} />
              <span style={{ width: "7px", height: "7px", borderRadius: "100px", background: "#C9C9CF", animation: "dot .8s .3s infinite" }} />
            </div>
          </div>
        ) : null}
      </div>
      <div style={{ position: "sticky", bottom: "0", background: "#FFFFFF", borderTop: "1px solid #EFEFF2", padding: "10px 16px max(26px,var(--sab))" }}>
        {v.showPrompts ? (
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", margin: "0 -16px 10px", padding: "0 16px" }}>
            {list(v.prompts).map((s: any, $i: number) => (
              <button key={$i} onClick={s?.onClick} style={{ flex: "none", padding: "0 14px", height: "36px", borderRadius: "100px", background: "#FFFFFF", border: "1px solid #E3E3E7", fontSize: "12px", fontWeight: "600", color: "#34343D", whiteSpace: "nowrap", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-11 tap-96">
                {s?.label}
              </button>
            ))}
          </div>
        ) : null}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input value={v.input ?? ""} onChange={v.onInput} onKeyDown={v.onKey} placeholder={v.chat?.placeholder} style={{ flex: "1", height: "48px", padding: "0 16px", borderRadius: "100px", border: "none", background: "#F7F7F9", fontSize: "14px", fontWeight: "500", outline: "none" }} className="focus-5" />
          <button onClick={v.sendInput} style={sx(`width:48px;height:48px;flex:none;border-radius:100px;border:none;background:linear-gradient(135deg,#6E2BF4,#4700D8);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:${v.sendOpacity ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
