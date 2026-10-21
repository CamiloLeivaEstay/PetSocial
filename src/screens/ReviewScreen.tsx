import { list, sx, txt, type Vals } from '../lib/view'

export function ReviewScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Escribir reseña" style={{ padding: "0 20px 130px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "56px" }}>
        <button onClick={v.back} style={{ width: "40px", height: "40px", marginLeft: "-8px", flex: "none", borderRadius: "100px", border: "none", background: "#F7F7F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>Escribir reseña</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", margin: "8px 0 24px", border: "1px solid #EFEFF2", borderRadius: "20px" }}>
        <img src={v.rv?.cover} alt="" style={{ width: "52px", height: "52px", flex: "none", borderRadius: "14px", objectFit: "cover" }} />
        <div style={{ flex: "1", minWidth: "0" }}>
          <p style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>{v.rv?.name}</p>
          <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>{v.rv?.sub}</p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <p style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "800" }}>¿Cómo fue el servicio?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
          {list(v.rvStars).map((st: any, $i: number) => (
            <button key={$i} onClick={st?.onClick} style={sx(`width:48px;height:48px;border:none;background:none;padding:0;cursor:pointer;font-size:38px;line-height:1;transition:transform .12s;color:${st?.color ?? ""}`)} className="tap-88">
              ★
            </button>
          ))}
        </div>
        <p style={sx(`margin:6px 0 0;height:18px;font-size:13px;font-weight:700;color:${v.rv?.labelColor ?? ""}`)}>{v.rv?.label}</p>
      </div>
      <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>¿Qué destacarías?</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
        {list(v.rvTags).map((t: any, $i: number) => (
          <button key={$i} onClick={t?.onClick} style={sx(`height:36px;padding:0 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;background:${t?.bg ?? ""};color:${t?.color ?? ""};border:1px solid ${t?.border ?? ""}`)} className="tap-96">
            {t?.label}
          </button>
        ))}
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#0F0F12", marginBottom: "24px" }}>
        {"Cuéntanos tu experiencia "}
        <textarea value={v.rv?.text ?? ""} onChange={v.onRvText} maxLength={500} rows={5} placeholder="¿Cómo trataron a tu mascota? ¿Volverías?" style={{ width: "100%", padding: "14px 16px", fontFamily: "inherit", fontSize: "14px", fontWeight: "500", lineHeight: "1.5", color: "#0F0F12", background: "#F7F7F9", border: "1.5px solid #E3E3E7", borderRadius: "20px", outline: "none", resize: "none" }} className="focus-4" />
        <span style={{ alignSelf: "flex-end", fontSize: "11px", fontWeight: "600", color: "#A5A5AD" }}>{txt(v.rv?.count)}/500</span>
      </label>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "10px" }}>
        <p style={{ margin: "0", fontSize: "13px", fontWeight: "700", color: "#0F0F12" }}>
          {"Fotos "}
          <span style={{ fontWeight: "500", color: "#A5A5AD" }}>(opcional)</span>
        </p>
        <span style={{ fontSize: "11px", fontWeight: "600", color: "#A5A5AD" }}>{txt(v.rv?.photoCount)}/4</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "8px" }}>
        {list(v.rvPhotos).map((ph: any, $i: number) => (
          <div key={$i} style={{ position: "relative", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", background: "#EFEFF2", animation: "fade .2s" }}>
            <img src={ph?.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <button onClick={ph?.remove} title="Quitar" style={{ position: "absolute", top: "4px", right: "4px", width: "22px", height: "22px", borderRadius: "100px", border: "none", background: "rgba(15,15,18,.7)", color: "#FFFFFF", fontSize: "11px", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
              ✕
            </button>
          </div>
        ))}
        {v.rv?.canAddPhoto ? (
          <label style={{ aspectRatio: "1", borderRadius: "14px", border: "1.5px dashed #9D7AF0", background: "rgba(244,238,254,.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", cursor: "pointer" }} className="hover-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4700D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#4700D8" }}>Agregar</span>
            <input type="file" accept="image/*" multiple onChange={v.onRvPhotos} style={{ display: "none" }} />
          </label>
        ) : null}
      </div>
      <p style={{ margin: "12px 0 0", fontSize: "12px", lineHeight: "1.5", color: "#7E7E87" }}>
        Las fotos ayudan a otros dueños a elegir. Evita mostrar datos personales.
      </p>
    </div>
  )
}
