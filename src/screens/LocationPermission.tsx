import type { Vals } from '../lib/view'

export function LocationPermission({ v }: { v: Vals }) {
  return (
    <>
      {v.askLoc ? (
        <div data-screen-label="Permiso ubicación" style={{ position: "absolute", top: "var(--sb)", left: "0", right: "0", bottom: "0", zIndex: "7" }}>
          <div style={{ position: "absolute", inset: "0", background: "rgba(15,15,18,.45)", animation: "fade .2s" }} />
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "12px 24px 40px", animation: "up .42s cubic-bezier(.22,1,.36,1)" }}>
            <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "#E3E3E7", margin: "0 auto 24px" }} />
            <div style={{ position: "relative", width: "88px", height: "88px", margin: "0 auto 20px" }}>
              <span style={{ position: "absolute", inset: "0", borderRadius: "100px", background: "#F4EEFE" }} />
              <span style={{ position: "absolute", inset: "12px", borderRadius: "100px", background: "#E5DAFB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
            </div>
            <h2 style={{ margin: "0 0 8px", textAlign: "center", fontSize: "22px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.02em", color: "#0F0F12", textWrap: "balance" }}>
              Activa tu ubicación para ver el mapa
            </h2>
            <p style={{ margin: "0 auto 24px", maxWidth: "300px", textAlign: "center", fontSize: "14px", lineHeight: "1.55", color: "#7E7E87", textWrap: "pretty" }}>
              La usamos para mostrarte hoteles, paseadores y veterinarios cerca de ti. Nunca la compartimos con proveedores sin tu permiso.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button onClick={v.locAllow} style={{ width: "100%", height: "52px", borderRadius: "100px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "16px", fontWeight: "700", cursor: "pointer" }} className="hover-1 tap-98">
                Permitir ubicación
              </button>
              <button onClick={v.locDeny} style={{ width: "100%", height: "44px", border: "none", background: "none", color: "#7E7E87", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-8 tap-96">
                Ahora no
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {v.locDenied ? (
        <div style={{ position: "absolute", left: "20px", right: "20px", top: "calc(var(--sb) + 123px)", zIndex: "5", display: "flex", alignItems: "center", gap: "12px", padding: "12px 12px 12px 16px", background: "#FFFFFF", border: "1px solid #EFEFF2", borderRadius: "20px", boxShadow: "0 8px 28px rgba(0,38,43,0.13)", animation: "fade .2s" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p style={{ flex: "1", margin: "0", fontSize: "12px", lineHeight: "1.4", fontWeight: "600", color: "#34343D" }}>
            Ubicación desactivada. Mostramos servicios en Santiago centro.
          </p>
          <button onClick={v.locAsk} style={{ flex: "none", height: "32px", padding: "0 12px", borderRadius: "100px", border: "none", background: "#F4EEFE", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            Activar
          </button>
        </div>
      ) : null}
    </>
  )
}
