import { sx, type Vals } from '../lib/view'

export function ReviewBar({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "6", background: "#FFFFFF", borderTop: "1px solid #EFEFF2", padding: "12px 20px max(30px,var(--sab))" }}>
      <button onClick={v.rvPublish} style={sx(`width:100%;height:52px;border-radius:100px;border:none;color:#FFFFFF;font-weight:700;font-size:16px;cursor:pointer;background:${v.rv?.ctaBg ?? ""};transition:transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s`)} className="tap-96">
        Publicar reseña
      </button>
    </div>
  )
}
