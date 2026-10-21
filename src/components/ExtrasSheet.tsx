import { list, sx, txt, type Vals } from '../lib/view'

export function ExtrasSheet({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", inset: "0", zIndex: "20" }}>
      <div onClick={v.closeExtras} style={{ position: "absolute", inset: "0", background: "rgba(15,15,18,.55)", animation: "fade .3s ease" }} />
      <div data-screen-label="Servicios adicionales" style={{ position: "absolute", left: "0", right: "0", bottom: "0", maxHeight: "86%", display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "28px 28px 0 0", padding: "12px 20px max(30px,var(--sab))", animation: "up .42s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ width: "40px", height: "4px", borderRadius: "100px", background: "#E3E3E7", margin: "0 auto 16px", flex: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px", flex: "none" }}>
          <img src={v.pv?.cover} alt="" style={{ width: "40px", height: "40px", borderRadius: "100px", objectFit: "cover" }} />
          <div style={{ flex: "1", minWidth: "0" }}>
            <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.01em" }}>Complementa la visita</h3>
            <p style={{ margin: "0", fontSize: "12px", fontWeight: "500", color: "#7E7E87" }}>{"Servicios que ofrece "}{txt(v.pv?.name)}</p>
          </div>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: "13px", lineHeight: "1.5", color: "#56565F", flex: "none" }}>
          {"Se realizan en la misma visita y quedan registrados en la ficha de "}{txt(v.exPetName)}.
        </p>
        <div style={{ flex: "1", minHeight: "0", overflowY: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column", gap: "10px", margin: "0 -20px", padding: "0 20px 4px" }}>
          {list(v.exList).map((x: any, $i: number) => (
            <div key={$i} style={sx(`padding:14px;border-radius:20px;transition:all .15s;background:${x?.bg ?? ""};border:${x?.border ?? ""}`)}>
              <div onClick={x?.toggle} style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <p style={{ margin: "0 0 2px", fontSize: "15px", fontWeight: "800", color: "#0F0F12" }}>{x?.name}</p>
                  <p style={{ margin: "0 0 6px", fontSize: "12px", lineHeight: "1.45", color: "#7E7E87", textWrap: "pretty" }}>{x?.desc}</p>
                  <p style={{ margin: "0", fontSize: "14px", fontWeight: "800", color: "#4700D8" }}>{"+ "}{txt(x?.price)}</p>
                </div>
                <span style={sx(`width:28px;height:28px;flex:none;border-radius:100px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;transition:all .15s;background:${x?.btnBg ?? ""};color:${x?.btnColor ?? ""};border:${x?.btnBorder ?? ""}`)}>
                  {x?.btnIcon}
                </span>
              </div>
              {x?.showVariants ? (
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #E5DAFB", animation: "fade .2s" }}>
                  <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: "700", letterSpacing: ".08em", textTransform: "uppercase", color: "#7E7E87" }}>
                    {x?.variantLabel}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {list(x?.variants).map((v: any, $i: number) => (
                      <button key={$i} onClick={v?.onClick} style={sx(`height:32px;padding:0 12px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;background:${v?.bg ?? ""};color:${v?.color ?? ""};border:1px solid ${v?.border ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
                        {v?.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <button onClick={v.closeExtras} style={sx(`flex:none;width:100%;height:52px;margin-top:16px;border-radius:100px;border:none;font-size:16px;font-weight:700;cursor:pointer;background:${v.exCtaBg ?? ""};color:${v.exCtaColor ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
          {v.exCta}
        </button>
      </div>
    </div>
  )
}
