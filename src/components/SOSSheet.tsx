import type { Vals } from '../lib/view'

export function SOSSheet({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "20" }}>
      <div onClick={v.closeSOS} style={{ position: "absolute", inset: "0", background: "rgba(15,15,18,.55)", animation: "fade .3s ease" }} />
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "12px 20px max(34px,var(--sab))", animation: "up .42s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "#E3E3E7", margin: "0 auto 16px" }} />
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "800" }}>SOS</h3>
        <p style={{ margin: "0 0 18px", fontSize: "14px", color: "#56565F" }}>Qué necesitas hacer.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button onClick={v.sosEmergency} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "14px", border: "none", background: "#FEF2F2", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <span style={{ width: "48px", height: "48px", flex: "none", borderRadius: "100px", background: "#B91C1C", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span>
              <span style={{ display: "block", fontWeight: "800", fontSize: "15px", color: "#0F0F12" }}>Llamar a urgencias veterinarias</span>
              <span style={{ display: "block", fontSize: "12px", color: "#56565F", marginTop: "2px" }}>Clínica 24h más cercana</span>
            </span>
          </button>
          <button onClick={v.sosLost} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "14px", border: "none", background: "#F7F7F9", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            <span style={{ width: "48px", height: "48px", flex: "none", borderRadius: "100px", background: "#0F0F12", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span>
              <span style={{ display: "block", fontWeight: "800", fontSize: "15px", color: "#0F0F12" }}>Mi mascota se perdió</span>
              <span style={{ display: "block", fontSize: "12px", color: "#56565F", marginTop: "2px" }}>Activar red comunitaria</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
