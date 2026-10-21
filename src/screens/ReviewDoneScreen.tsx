import { list, txt, type Vals } from '../lib/view'

export function ReviewDoneScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Reseña publicada" style={{ minHeight: "100%", padding: "24px 24px 40px", display: "flex", flexDirection: "column", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ width: "88px", height: "88px", borderRadius: "100px", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", animation: "splashIn .5s cubic-bezier(.34,1.56,.64,1)" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h1 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.025em" }}>¡Gracias por tu reseña!</h1>
        <p style={{ margin: "0 0 24px", maxWidth: "300px", fontSize: "14px", lineHeight: "1.55", color: "#7E7E87", textWrap: "pretty" }}>
          {"Ya está publicada en el perfil de "}{txt(v.rvDone?.name)}{" y ayudará a otros dueños a decidir."}
        </p>
        <div style={{ width: "100%", textAlign: "left", border: "1px solid #EFEFF2", borderRadius: "20px", padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <p style={{ margin: "0", fontSize: "13px", fontWeight: "800" }}>Tú · hoy</p>
            <span style={{ color: "#FFB800", fontSize: "13px", letterSpacing: "1px" }}>{v.rvDone?.stars}</span>
          </div>
          {v.rvDone?.text ? (
            <p style={{ margin: "0 0 8px", fontSize: "13px", lineHeight: "1.5", color: "#34343D" }}>{v.rvDone?.text}</p>
          ) : null}
          {v.rvDone?.hasPhotos ? (
            <div style={{ display: "flex", gap: "6px" }}>
              {list(v.rvDone?.photos).map((ph: any, $i: number) => (
                <img key={$i} src={ph} alt="" style={{ width: "52px", height: "52px", borderRadius: "10px", objectFit: "cover" }} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <button onClick={v.rvSeeProfile} style={{ width: "100%", height: "52px", borderRadius: "100px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="hover-1 tap-96">
          {"Ver en el perfil de "}{txt(v.rvDone?.name)}
        </button>
        <button onClick={v.goHome} style={{ width: "100%", height: "44px", border: "none", background: "none", color: "#7E7E87", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
