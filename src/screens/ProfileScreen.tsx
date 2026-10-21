import { list, sx, txt, type Vals } from '../lib/view'

export function ProfileScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Perfil" style={{ padding: "8px 20px 110px", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "8px 0 20px" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "100px", background: "linear-gradient(135deg,#5418B2,#E83868)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "800" }}>
          D
        </div>
        <div>
          <h1 style={{ margin: "0", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em" }}>Diego</h1>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#7E7E87" }}>diego@petsocial.cl</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Mis mascotas</h2>
        <button onClick={v.addPet} style={{ border: "none", background: "none", color: "#4700D8", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          + Añadir
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        {list(v.pets).map((p: any, $i: number) => (
          <div key={$i} onClick={p?.onClick} style={sx(`border-radius:20px;overflow:hidden;background:#FCEEDF;cursor:pointer;animation:fadeUp .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:${p?.delay ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s`)} className="tap-98 hover-6">
            <img src={p?.photo} alt="" style={{ width: "100%", aspectRatio: "1.2", objectFit: "cover", display: "block" }} />
            <div style={{ padding: "10px 12px" }}>
              <p style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>{p?.name}</p>
              <p style={{ margin: "0", fontSize: "11px", color: "#A85A1E", fontWeight: "600" }}>{txt(p?.breed)}{" · "}{txt(p?.age)}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={v.goFavorites} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", marginBottom: "12px", borderRadius: "20px", border: "1px solid #EFEFF2", background: "#FFFFFF", textAlign: "left", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .2s" }} className="hover-6 tap-98">
        <span style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", background: "#FDDFD9", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#F35843" stroke="#F35843" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </span>
        <span style={{ flex: "1", minWidth: "0" }}>
          <span style={{ display: "block", fontSize: "15px", fontWeight: "800", color: "#0F0F12" }}>Mis favoritos</span>
          <span style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#7E7E87" }}>{v.favSummary}</span>
        </span>
        <span style={{ color: "#A5A5AD", fontSize: "18px" }}>›</span>
      </button>
      <div style={{ border: "1px solid #EFEFF2", borderRadius: "20px", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #EFEFF2" }}>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>Notificaciones push</span>
          <button onClick={v.toggleNotif} style={sx(`position:relative;width:48px;height:28px;border-radius:14px;border:none;cursor:pointer;transition:background .2s;background:${v.notifBg ?? ""}`)} className="tap-96">
            <span style={sx(`position:absolute;top:3px;width:22px;height:22px;border-radius:100px;background:#FFFFFF;box-shadow:0 1px 3px rgba(15,15,18,.15);transition:left .2s;left:${v.notifLeft ?? ""}`)} />
          </button>
        </div>
        <div onClick={v.goPayments} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #EFEFF2", cursor: "pointer" }}>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>Métodos de pago</span>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "600", color: "#7E7E87" }}>
            {txt(v.payShort)}
            <span style={{ color: "#A5A5AD", fontSize: "15px" }}>›</span>
          </span>
        </div>
        <div onClick={v.goHelp} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", cursor: "pointer" }}>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>Ayuda</span>
          <span style={{ color: "#A5A5AD" }}>›</span>
        </div>
      </div>
    </div>
  )
}
