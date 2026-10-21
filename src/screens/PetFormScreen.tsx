import { list, sx, type Vals } from '../lib/view'

export function PetFormScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Formulario mascota" style={{ padding: "0 20px 120px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
        <button onClick={v.back} style={{ width: "40px", height: "40px", marginLeft: "-8px", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>{v.formTitle}</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", margin: "8px 0 24px" }}>
        <label style={{ position: "relative", width: "112px", height: "112px", borderRadius: "100px", cursor: "pointer", display: "block" }}>
          <img src={v.f?.photoShown} alt="" style={{ width: "100%", height: "100%", borderRadius: "100px", objectFit: "cover", display: "block", background: "#FCEEDF", border: "3px solid #FFFFFF", boxShadow: "0 4px 16px rgba(15,15,18,0.08)" }} />
          <span style={{ position: "absolute", right: "0", bottom: "4px", width: "36px", height: "36px", borderRadius: "100px", background: "#4700D8", border: "3px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </span>
          <input type="file" accept="image/*" onChange={v.onPhoto} style={{ display: "none" }} />
        </label>
        <span style={{ fontSize: "12px", fontWeight: "600", color: "#7E7E87" }}>{v.photoHint}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "700", color: "#34343D" }}>
          {"Nombre "}
          <input value={v.f?.name ?? ""} onChange={v.fOn?.name} placeholder="Ej: Rocky" style={sx(`height:48px;padding:0 16px;border-radius:14px;border:1.5px solid #E3E3E7;background:#F7F7F9;font-size:15px;font-weight:500;color:#0F0F12;outline:none;width:100%;min-width:0;border-color:${v.nameBorder ?? ""}`)} className="focus-3" />
          {v.nameError ? (
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#B91C1C" }}>Ingresa el nombre de tu mascota</span>
          ) : null}
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "700", color: "#34343D" }}>
          {"Especie "}
          <div style={{ display: "flex", background: "#EFEFF2", borderRadius: "14px", padding: "3px", gap: "2px" }}>
            {list(v.speciesOpts).map((o: any, $i: number) => (
              <button key={$i} onClick={o?.onClick} style={sx(`flex:1;height:40px;border-radius:10px;border:none;font-size:14px;font-weight:700;cursor:pointer;background:${o?.bg ?? ""};color:${o?.color ?? ""};box-shadow:${o?.shadow ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                {o?.label}
              </button>
            ))}
          </div>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "700", color: "#34343D" }}>
          {"Raza "}
          <input value={v.f?.breed ?? ""} onChange={v.fOn?.breed} placeholder="Ej: Mestizo" style={{ height: "48px", padding: "0 16px", borderRadius: "14px", border: "1.5px solid #E3E3E7", background: "#F7F7F9", fontSize: "15px", fontWeight: "500", color: "#0F0F12", outline: "none", width: "100%", minWidth: "0" }} className="focus-3" />
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "700", color: "#34343D" }}>
            {"Edad (años) "}
            <input type="number" min="0" value={v.f?.age ?? ""} onChange={v.fOn?.age} placeholder="0" style={{ height: "48px", padding: "0 16px", borderRadius: "14px", border: "1.5px solid #E3E3E7", background: "#F7F7F9", fontSize: "15px", fontWeight: "500", color: "#0F0F12", outline: "none", width: "100%", minWidth: "0" }} className="focus-3" />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "700", color: "#34343D" }}>
            {"Peso (kg) "}
            <input type="number" min="0" step="0.1" value={v.f?.weight ?? ""} onChange={v.fOn?.weight} placeholder="0" style={{ height: "48px", padding: "0 16px", borderRadius: "14px", border: "1.5px solid #E3E3E7", background: "#F7F7F9", fontSize: "15px", fontWeight: "500", color: "#0F0F12", outline: "none", width: "100%", minWidth: "0" }} className="focus-3" />
          </label>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "700", color: "#34343D" }}>
          {"Alergias "}
          <input value={v.f?.allergies ?? ""} onChange={v.fOn?.allergies} placeholder="Separadas por coma. Ej: Pollo, Trigo" style={{ height: "48px", padding: "0 16px", borderRadius: "14px", border: "1.5px solid #E3E3E7", background: "#F7F7F9", fontSize: "15px", fontWeight: "500", color: "#0F0F12", outline: "none", width: "100%", minWidth: "0" }} className="focus-3" />
          <span style={{ fontSize: "12px", fontWeight: "500", color: "#7E7E87" }}>Se mostrarán destacadas a los proveedores</span>
        </label>
        <div style={{ border: "1px solid #EFEFF2", borderRadius: "20px", padding: "0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 0", borderBottom: "1px solid #EFEFF2" }}>
            <span style={{ fontSize: "15px", fontWeight: "700" }}>Vacunas al día</span>
            <button onClick={v.fOn?.vaccinated} style={sx(`position:relative;width:48px;height:28px;flex:none;border-radius:14px;border:none;cursor:pointer;transition:background .2s;background:${v.fSw?.vaccinatedBg ?? ""}`)} className="tap-96">
              <span style={sx(`position:absolute;top:3px;width:22px;height:22px;border-radius:100px;background:#FFFFFF;box-shadow:0 1px 3px rgba(15,15,18,.15);transition:left .2s;left:${v.fSw?.vaccinatedLeft ?? ""}`)} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 0" }}>
            <span style={{ fontSize: "15px", fontWeight: "700" }}>Esterilizado</span>
            <button onClick={v.fOn?.sterilized} style={sx(`position:relative;width:48px;height:28px;flex:none;border-radius:14px;border:none;cursor:pointer;transition:background .2s;background:${v.fSw?.sterilizedBg ?? ""}`)} className="tap-96">
              <span style={sx(`position:absolute;top:3px;width:22px;height:22px;border-radius:100px;background:#FFFFFF;box-shadow:0 1px 3px rgba(15,15,18,.15);transition:left .2s;left:${v.fSw?.sterilizedLeft ?? ""}`)} />
            </button>
          </div>
        </div>
        {v.canDelete ? (
          <button onClick={v.deletePet} style={{ height: "48px", borderRadius: "20px", border: "none", background: "#FEF2F2", color: "#B91C1C", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-14 tap-96">
            Eliminar mascota
          </button>
        ) : null}
      </div>
    </div>
  )
}
