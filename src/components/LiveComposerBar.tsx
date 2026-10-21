import { list, type Vals } from '../lib/view'

export function LiveComposerBar({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "6", background: "#FFFFFF", borderTop: "1px solid #EFEFF2", padding: "10px 16px max(30px,var(--sab))" }}>
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", margin: "0 -16px 10px", padding: "0 16px" }}>
        {list(v.liveQuick).map((q: any, $i: number) => (
          <button key={$i} onClick={q?.onClick} style={{ flex: "none", height: "32px", padding: "0 12px", borderRadius: "100px", border: "1px solid #E3E3E7", background: "#FFFFFF", color: "#34343D", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-11 tap-96">
            {q?.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input ref={v.liveInputRef} value={v.liveInput ?? ""} onChange={v.onLiveInput} onKeyDown={v.onLiveKey} placeholder={v.liveInputPh} style={{ flex: "1", minWidth: "0", height: "44px", padding: "0 16px", borderRadius: "100px", border: "1px solid #E3E3E7", background: "#F7F7F9", fontSize: "14px", fontWeight: "500", color: "#0F0F12", outline: "none" }} className="focus-4" />
        <button onClick={v.liveSendBtn} style={{ width: "44px", height: "44px", flex: "none", borderRadius: "100px", border: "none", background: "#4700D8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
