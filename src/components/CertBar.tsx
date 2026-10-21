import { sx, type Vals } from '../lib/view'

export function CertBar({ v }: { v: Vals }) {
  return (
    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "6", background: "#FFFFFF", borderTop: "1px solid #EFEFF2", padding: "12px 20px max(30px,var(--sab))" }}>
      <button onClick={v.certNext} style={sx(`width:100%;height:52px;border-radius:100px;border:none;color:#FFFFFF;font-weight:700;font-size:16px;cursor:pointer;transition:background-color .25s,transform .15s;background:${v.ct?.ctaBg ?? ""}`)} className="tap-98">
        {v.ct?.cta}
      </button>
    </div>
  )
}
