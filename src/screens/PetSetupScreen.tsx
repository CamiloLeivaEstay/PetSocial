import { list, sx, type Vals } from '../lib/view'

export function PetSetupScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Configura tu mascota" style={{ minHeight: "100%", background: "#FFFFFF", display: "flex", flexDirection: "column", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ flex: "1", padding: "24px 24px 24px", display: "flex", flexDirection: "column" }}>
        <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "800", lineHeight: "1.15", letterSpacing: "-0.025em", color: "#0F0F12", textWrap: "balance" }}>
          Cuéntanos de tu mascota
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: "15px", lineHeight: "1.5", color: "#7E7E87", textWrap: "pretty" }}>
          Con esto personalizamos tus recomendaciones. Podrás completar su perfil más adelante.
        </p>
        <p style={{ margin: "0 0 12px", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>¿Qué mascota tienes?</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "10px", marginBottom: "24px" }}>
          {list(v.setupSpecies).map((o: any, $i: number) => (
            <button key={$i} onClick={o?.onClick} style={sx(`display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 8px 12px;border-radius:20px;cursor:pointer;transition:all .15s;background:${o?.bg ?? ""};border:2px solid ${o?.border ?? ""}`)} className="tap-96">
              <img src={o?.photo} alt="" style={{ width: "56px", height: "56px", borderRadius: "100px", objectFit: "cover", display: "block" }} />
              <span style={sx(`font-size:14px;font-weight:700;color:${o?.color ?? ""}`)}>{o?.label}</span>
            </button>
          ))}
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#0F0F12", marginBottom: "24px" }}>
          {"¿Cómo se llama? "}
          <input value={v.setup?.name ?? ""} onChange={v.onSetupName} onKeyDown={v.onSetupKey} placeholder="Ej: Luna, Milo, Rocco…" style={sx(`width:100%;height:48px;padding:0 16px;font-size:15px;font-weight:500;color:#0F0F12;background:#FFFFFF;border:1px solid ${v.setupNameBorder ?? ""};border-radius:100px;outline:none;transition:border-color .15s,box-shadow .15s`)} className="focus-1" />
          {v.setupNameError ? (
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#B91C1C" }}>Ingresa el nombre de tu mascota</span>
          ) : null}
        </label>
        <p style={{ margin: "0 0 12px", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>
          {"Foto "}
          <span style={{ fontWeight: "500", color: "#A5A5AD" }}>(opcional)</span>
        </p>
        <label style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px", border: "1.5px dashed #9D7AF0", borderRadius: "20px", background: "rgba(244,238,254,.5)", cursor: "pointer" }} className="hover-3">
          {v.setupHasPhoto ? (
            <img src={v.setup?.photo} alt="" style={{ width: "64px", height: "64px", flex: "none", borderRadius: "100px", objectFit: "cover", display: "block" }} />
          ) : null}
          {v.setupNoPhoto ? (
            <span style={{ width: "64px", height: "64px", flex: "none", borderRadius: "100px", background: "#E5DAFB", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
          ) : null}
          <div style={{ flex: "1", minWidth: "0" }}>
            <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: "700", color: "#4700D8" }}>{v.setupPhotoTitle}</p>
            <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87" }}>JPG o PNG desde tu galería</p>
          </div>
          <input type="file" accept="image/*" onChange={v.onSetupPhoto} style={{ display: "none" }} />
        </label>
      </div>
      <div style={{ padding: "12px 24px 40px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <button onClick={v.setupSave} style={sx(`width:100%;height:52px;border-radius:100px;border:none;background:${v.setupCtaBg ?? ""};color:#FFFFFF;font-size:16px;font-weight:700;cursor:pointer;transition:background .15s`)} className="tap-98">
          Continuar
        </button>
      </div>
    </div>
  )
}
