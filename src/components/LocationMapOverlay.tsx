import { txt, type Vals } from '../lib/view'

export function LocationMapOverlay({ v }: { v: Vals }) {
  return (
    <div data-screen-label="Mapa ubicación" style={{ position: "absolute", inset: "0", zIndex: "20", overflow: "hidden", animation: "fadeUp .35s cubic-bezier(.2,.8,.2,1) both" }}>
      <div style={{ position: "absolute", inset: "0", background: "#E8EDF2" }} />
      <div style={{ position: "absolute", left: "0", right: "0", top: "38%", height: "16px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", left: "0", right: "0", top: "72%", height: "9px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", top: "0", bottom: "0", left: "22%", width: "12px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", top: "0", bottom: "0", left: "68%", width: "16px", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", left: "-10%", right: "-10%", top: "58%", height: "8px", background: "#FFFFFF", transform: "rotate(-14deg)" }} />
      <div style={{ position: "absolute", left: "28%", top: "8%", width: "34%", height: "24%", borderRadius: "14px", background: "#DDEBDD" }} />
      <div style={{ position: "absolute", left: "74%", top: "46%", width: "22%", height: "20%", borderRadius: "14px", background: "#DDEBDD" }} />
      <div style={{ position: "absolute", left: "4%", top: "78%", width: "16%", height: "18%", borderRadius: "12px", background: "#D6E6F2" }} />
      <div style={{ position: "absolute", left: "12%", top: "18%", width: "10px", height: "10px", borderRadius: "100px", background: "#FFFFFF", border: "3px solid #4700D8", boxShadow: "0 0 0 6px rgba(71,0,216,.15)" }} />
      <svg style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 390 844" preserveAspectRatio="none">
        <path d="M60 162 C 90 260, 150 300, 195 395" stroke="#4700D8" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
      </svg>
      <div style={{ position: "absolute", left: "50%", top: "47%", transform: "translate(-50%,-100%)", display: "flex", flexDirection: "column", alignItems: "center", animation: "popIn .5s cubic-bezier(.34,1.56,.64,1) .15s both" }}>
        <span style={{ position: "absolute", bottom: "-8px", width: "64px", height: "20px", borderRadius: "100px", background: "rgba(71,0,216,.2)", animation: "livePulse 2.4s ease-out infinite" }} />
        <svg viewBox="0 0 150 183" fill="none" style={{ display: "block", width: "48px", height: "auto", filter: "drop-shadow(0 6px 10px rgba(71,0,216,.35))" }}>
          <path fillRule="evenodd" clipRule="evenodd" d="M0.986188 86.9464C0.967596 86.8157 0.798659 85.647 0.74235 85.3118C-0.551705 77.6436 0.136235 68.7101 0.638239 65.6678C1.11421 62.779 3.06803 41.9323 21.5986 22.8513C25.3416 18.9968 30.776 14.7465 32.1535 13.8317C35.3642 11.6989 49.9191 1.237 71.305 0.102844C96.2363 -1.2199 119.258 10.323 133.852 28.5986C141.809 38.5643 145.866 49.568 147.361 55.0237C150.515 66.5342 150.441 77.1337 149.211 86.3599C148.677 90.3648 146.827 97.812 145.096 102.305C141.402 111.891 135.738 124.166 104.06 158.451C99.1888 163.723 88.133 175.121 85.9726 176.993C82.9653 179.599 80.8256 182.334 76.1051 182.691C70.3127 183.129 67.5737 180.378 63.7989 176.779C46.5873 160.368 30.7734 141.327 28.0817 138.087C19.9439 128.289 20.1569 128.13 16.7013 123.499C8.29259 112.232 2.37746 98.0091 0.986188 86.9464Z" fill="#4700D8" />
          <path fillRule="evenodd" clipRule="evenodd" d="M77.1455 21.8226C84.1018 22.3443 84.5427 22.6126 88.358 23.5119C93.9326 24.8262 99.6571 27.8833 100.586 28.3795C108.929 32.8354 114.759 39.6387 115.782 40.8324C120.291 46.0941 123.133 51.723 123.983 53.9536C124.683 55.7905 132.66 71.86 125.274 93.2204C121.604 103.833 114.942 111.177 111.961 114.852C110.898 116.162 107.057 120.173 106.622 120.627C103.344 124.05 103.512 124.208 94.0011 132.965C92.2986 134.533 88.7968 137.558 88.3399 137.953C81.4452 143.91 78.4401 146.207 76.1718 148.106C73.1948 150.597 73.6277 147.29 73.6453 143.234C73.649 142.298 73.6904 132.422 73.6405 131.536C73.5013 129.063 72.2115 130.168 65.9622 129.089C63.577 128.677 49.1124 126.594 36.2956 112.91C35.9227 112.512 30.8214 106.897 27.6107 100.267C26.7198 98.4274 18.011 82.4754 23.0677 63.0417C24.2348 58.5566 27.5825 45.8179 40.6702 34.5252C49.098 27.2533 60.021 23.2474 68.145 22.3151C72.944 21.7642 73.7133 21.7764 77.1455 21.8226Z" fill="#FFFFFF" />
          <path fillRule="evenodd" clipRule="evenodd" d="M71.8069 72.8953C72.8906 72.7105 72.873 72.6866 73.9674 72.5617C75.4617 72.3907 78.7978 73.0606 79.8756 73.4781C80.6422 73.7756 84.5721 75.2991 88.0718 79.687C91.5178 84.008 91.4732 84.0255 94.566 88.5898C101.677 99.0856 96.2223 107.95 88.8554 108.356C85.5326 108.539 84.349 108.063 79.33 106.43C76.9172 105.646 72.9155 105.502 69.7048 106.533C66.7672 107.475 57.6291 111.527 53.0585 103.487C49.2879 96.854 54.08 89.2814 57.9786 84.2215C62.391 78.4944 65.5767 74.1017 71.8069 72.8953Z" fill="#4700D8" />
          <path fillRule="evenodd" clipRule="evenodd" d="M78.9385 52.9638C78.982 52.805 79.8654 48.5839 82.4063 45.9554C84.6432 43.6414 86.6773 43.3466 87.7769 43.2786C95.5333 42.7999 97.8574 53.7723 94.9075 60.4562C93.2862 64.1301 91.8615 66.111 87.7764 67.2515C84.6608 68.1211 80.8811 65.7747 79.492 61.8766C77.8797 57.3538 78.9215 53.0738 78.9385 52.9638Z" fill="#4700D8" />
          <path fillRule="evenodd" clipRule="evenodd" d="M59.1088 66.1801C52.7639 61.6446 52.8515 52.5793 54.459 48.7327C57.0657 42.4946 62.7323 41.8231 66.6734 45.3201C68.5964 47.0259 68.9699 48.1064 69.4453 49.0822C73.1979 56.7833 69.9787 64.9041 65.9732 66.6795C64.8566 67.1746 62.3843 68.2073 59.1088 66.1801Z" fill="#4700D8" />
          <path fillRule="evenodd" clipRule="evenodd" d="M97.177 66.6269C97.2609 66.5047 97.322 66.3676 97.4059 66.2455C100.433 61.8512 104.638 60.801 107.873 62.6502C112.6 65.3519 112.841 73.6709 108.712 78.6022C106.228 81.5707 104.301 81.8129 103.676 81.9712C96.9756 83.6716 91.885 75.3644 97.177 66.6269Z" fill="#4700D8" />
          <path fillRule="evenodd" clipRule="evenodd" d="M51.1825 81.1605C50.3841 81.5589 48.3325 82.9507 44.7649 81.5722C41.1897 80.1905 37.3145 74.4644 38.2648 68.3102C38.5145 66.6953 39.57 63.5213 42.5672 62.3345C42.9231 62.1937 45.4602 60.76 49.0481 62.9438C52.8129 65.2355 54.006 69.7716 54.1919 70.4776C55.4116 75.1141 54.0065 79.0552 51.5406 80.9209C51.4264 81.0075 51.2973 81.0734 51.1825 81.1605Z" fill="#4700D8" />
        </svg>
      </div>
      <div style={{ position: "absolute", top: "calc(var(--sb) + 9px)", left: "16px", right: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={v.closeLocMap} style={{ width: "40px", height: "40px", flex: "none", borderRadius: "100px", border: "none", background: "#FFFFFF", boxShadow: "0 4px 16px rgba(15,15,18,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .15s" }} className="tap-94">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F0F12" strokeWidth="2.4" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <span style={{ flex: "1", minWidth: "0", height: "40px", display: "flex", alignItems: "center", padding: "0 16px", borderRadius: "100px", background: "#FFFFFF", boxShadow: "0 4px 16px rgba(15,15,18,0.12)", fontSize: "13px", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {v.pv?.name}
        </span>
      </div>
      <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "34px", padding: "16px", background: "#FFFFFF", borderRadius: "24px", boxShadow: "0 12px 32px rgba(0,38,43,.16)", animation: "up .45s cubic-bezier(.22,1,.36,1) .1s both" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
          <img src={v.pv?.cover} alt="" style={{ width: "52px", height: "52px", flex: "none", borderRadius: "14px", objectFit: "cover" }} />
          <div style={{ flex: "1", minWidth: "0" }}>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {v.pv?.name}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "12px", lineHeight: "1.4", color: "#56565F" }}>{v.pv?.address}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px", marginBottom: "14px" }}>
          <div style={{ padding: "10px", borderRadius: "14px", background: "#F7F7F9", textAlign: "center" }}>
            <p style={{ margin: "0", fontSize: "10px", fontWeight: "700", letterSpacing: ".06em", textTransform: "uppercase", color: "#7E7E87" }}>
              Distancia
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: "800" }}>{txt(v.pv?.km)}{" km"}</p>
          </div>
          <div style={{ padding: "10px", borderRadius: "14px", background: "#F7F7F9", textAlign: "center" }}>
            <p style={{ margin: "0", fontSize: "10px", fontWeight: "700", letterSpacing: ".06em", textTransform: "uppercase", color: "#7E7E87" }}>
              En auto
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: "800" }}>{v.locEtaCar}</p>
          </div>
          <div style={{ padding: "10px", borderRadius: "14px", background: "#F7F7F9", textAlign: "center" }}>
            <p style={{ margin: "0", fontSize: "10px", fontWeight: "700", letterSpacing: ".06em", textTransform: "uppercase", color: "#7E7E87" }}>
              A pie
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: "800" }}>{v.locEtaWalk}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <button onClick={v.locCopy} style={{ height: "46px", borderRadius: "100px", border: "1.5px solid #E3E3E7", background: "#FFFFFF", color: "#34343D", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "transform .15s" }} className="tap-96">
            Copiar dirección
          </button>
          <button onClick={v.locGo} style={{ height: "46px", borderRadius: "100px", border: "none", background: "#4700D8", color: "#FFFFFF", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "transform .15s,background-color .2s" }} className="hover-1 tap-96">
            Cómo llegar
          </button>
        </div>
      </div>
    </div>
  )
}
