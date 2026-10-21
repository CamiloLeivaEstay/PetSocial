import { txt, type Vals } from '../lib/view'

export function Toast({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", left: "50%", top: "calc(var(--sb) + 13px)", transform: "translateX(-50%)", zIndex: "25", padding: "10px 16px", borderRadius: "100px", background: "#0F0F12", color: "#FFFFFF", fontSize: "13px", fontWeight: "700", whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(15,15,18,.2)", animation: "toastIn .35s cubic-bezier(.22,1,.36,1) both" }}>
      {"✓ "}{txt(v.toast)}
    </div>
  )
}
