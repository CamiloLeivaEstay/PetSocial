import { list, sx, type Vals } from '../lib/view'

export function OnboardingScreen({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Onboarding" style={{ minHeight: "100%", background: "#FFFFFF", display: "flex", flexDirection: "column", animation: "screenIn .38s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 24px 8px" }}>
        <button onClick={v.skipOnb} style={{ padding: "4px 12px", border: "none", background: "none", fontSize: "14px", fontWeight: "600", color: "#7E7E87", cursor: "pointer", transition: "transform .15s cubic-bezier(.2,.8,.2,1),background-color .2s,color .2s,border-color .2s,box-shadow .2s,opacity .2s" }} className="tap-96">
          Omitir
        </button>
      </div>
      {list(v.onbSlides).map((o: any, $i: number) => (
        <div key={$i} style={sx(`flex:1;flex-direction:column;padding:0 24px;display:${o?.display ?? ""}`)}>
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 0 56px" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "280px", height: "220px", animation: "onbPop .35s cubic-bezier(.4,0,.2,1)" }}>
              <svg viewBox="0 0 390 279" preserveAspectRatio="xMidYMid meet" fill="none" style={{ position: "absolute", left: "-12%", top: "-4%", width: "124%", height: "108%", pointerEvents: "none" }}>
                <path d="M23.259 114.75C28.3525 87.4203 47.3022 74.2976 76.0856 54.68C104.72 35.1639 123.394 22.2315 150.711 27.3303C229.495 42.0355 237.314 192.088 191.763 223.331C146.213 254.574 8.57986 193.511 23.259 114.75Z" fill="#F4EEFE" />
                <path d="M232.961 29.344C259.745 21.8999 279.865 33.148 310.141 50.3715C340.262 67.5059 360.088 78.5894 367.522 105.366C388.962 182.59 257.637 255.6 209.546 228.43C161.455 201.261 155.768 50.7976 232.961 29.344Z" fill="#E5DAFB" />
              </svg>
              <div style={{ position: "absolute", top: "16px", left: "8px", width: "44%", height: "58%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 4px 16px rgba(15,15,18,0.12)" }}>
                <img src={o?.photoA} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ position: "absolute", bottom: "8px", right: "8px", width: "52%", height: "78%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 4px 16px rgba(15,15,18,0.12)" }}>
                <img src={o?.photoB} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "0 8px", marginBottom: "auto", animation: "onbText .3s ease .1s both" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "28px", fontWeight: "800", lineHeight: "1.15", letterSpacing: "-0.025em", color: "#0F0F12", textWrap: "balance" }}>
              {o?.title}
            </h2>
            <p style={{ margin: "0 auto", maxWidth: "320px", fontSize: "15px", lineHeight: "1.6", color: "#7E7E87", textWrap: "pretty" }}>{o?.body}</p>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "40px 0 24px" }}>
        {list(v.onbDots).map((d: any, $i: number) => (
          <button key={$i} onClick={d?.onClick} style={sx(`height:8px;padding:0;border:none;border-radius:100px;cursor:pointer;transition:all .25s;width:${d?.w ?? ""};background:${d?.bg ?? ""}`)} className="tap-96" />
        ))}
      </div>
      <div style={{ padding: "0 24px 40px" }}>
        <button onClick={v.onbNext} style={{ width: "100%", height: "52px", borderRadius: "100px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "background .15s" }} className="hover-1 tap-98">
          {v.onbCta}
        </button>
      </div>
    </div>
  )
}
