import { list, sx, type Vals } from '../lib/view'

export function TabBar({ v }: { v: Vals }) {
  return (
    <nav style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "6", background: "rgba(255,255,255,.96)", backdropFilter: "blur(20px)", borderTop: "1px solid #EFEFF2", paddingBottom: "max(22px,var(--sab))" }}>
      <div style={{ display: "flex", height: "62px", padding: "0 8px" }}>
        {list(v.tabs).map((t: any, $i: number) => (
          <button key={$i} onClick={t?.onClick} style={sx(`position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:none;background:none;cursor:pointer;color:${t?.color ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
            <span style={sx(`position:absolute;top:0;height:3px;border-radius:100px;transition:width .3s cubic-bezier(.2,.8,.2,1),background-color .2s;width:${t?.lineW ?? ""};background:${t?.line ?? ""}`)} />
            {t?.dot ? (
              <span style={{ position: "absolute", top: "10px", left: "50%", marginLeft: "5px", width: "8px", height: "8px", borderRadius: "100px", background: "#F35843", border: "2px solid #FFFFFF" }} />
            ) : null}
            <svg width="22" height="22" viewBox={t?.vb} fill="none" stroke="currentColor" strokeWidth={t?.sw} style={sx(`transition:transform .25s cubic-bezier(.34,1.56,.64,1);transform:${t?.lift ?? ""}`)} strokeLinecap="round" strokeLinejoin="round">
              <path d={t?.path} />
              <path d={t?.paw} transform={t?.pawT} />
            </svg>
            <span style={{ fontSize: "10px", fontWeight: "600" }}>{t?.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
