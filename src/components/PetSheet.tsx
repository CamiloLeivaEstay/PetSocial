import { list, sx, txt, type Vals } from '../lib/view'

export function PetSheet({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "20" }}>
      <div onClick={v.closePetSheet} style={{ position: "absolute", inset: "0", background: "rgba(15,15,18,.55)", animation: "fade .3s ease" }} />
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "12px 20px max(34px,var(--sab))", animation: "up .42s cubic-bezier(.22,1,.36,1)", maxHeight: "80%", overflowY: "auto" }}>
        <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "#E3E3E7", margin: "0 auto 16px" }} />
        <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.01em" }}>Cambiar mascota</h3>
        <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#56565F" }}>Verás recomendaciones pensadas para ella.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {list(v.petSheetOpts).map((o: any, $i: number) => (
            <button key={$i} onClick={o?.onClick} style={sx(`display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;text-align:left;cursor:pointer;background:${o?.bg ?? ""};border:${o?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
              <img src={o?.photo} alt="" style={{ width: "52px", height: "52px", flex: "none", borderRadius: "100px", objectFit: "cover" }} />
              <div style={{ flex: "1", minWidth: "0" }}>
                <p style={{ margin: "0", fontSize: "15px", fontWeight: "800", color: "#0F0F12" }}>{o?.name}</p>
                <p style={{ margin: "0", fontSize: "12px", color: "#7E7E87", fontWeight: "500" }}>
                  {txt(o?.species)}{" · "}{txt(o?.breed)}{" · "}{txt(o?.age)}
                </p>
              </div>
              <span style={sx(`width:24px;height:24px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:13px;font-weight:800;background:${o?.checkBg ?? ""};border:${o?.checkBorder ?? ""}`)}>
                {o?.check}
              </span>
            </button>
          ))}
          <button onClick={v.addPetFromSheet} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", borderRadius: "14px", border: "2px dashed #9D7AF0", background: "rgba(244,238,254,.5)", color: "#4700D8", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
            + Añadir mascota
          </button>
        </div>
      </div>
    </div>
  )
}
