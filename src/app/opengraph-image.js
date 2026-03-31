import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b2640",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "480px",
            height: "480px",
            background: "radial-gradient(circle, rgba(255,109,31,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-80px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(18,63,109,0.6) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 80px",
            flex: 1,
            gap: "0px",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #ff6d1f, #e85a0a)",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(255,109,31,0.4)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "white",
                letterSpacing: "-1px",
              }}
            >
              Prodify
            </span>
          </div>

          {/* Main headline */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "900",
              color: "white",
              lineHeight: "1.05",
              letterSpacing: "-3px",
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Discover.</span>
            <span style={{ color: "#ff6d1f" }}>Shop.</span>
            <span>Enjoy.</span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.55)",
              margin: "0",
              fontWeight: "500",
              letterSpacing: "0px",
            }}
          >
            Premium multi-category product experience
          </p>
        </div>

        {/* Right decorative panel */}
        <div
          style={{
            width: "340px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            padding: "60px 40px",
          }}
        >
          {["Electronics", "Clothing", "Beauty", "Furniture", "Sports"].map((label, i) => (
            <div
              key={label}
              style={{
                width: "100%",
                padding: "14px 22px",
                background: i === 1 ? "rgba(255,109,31,0.15)" : "rgba(255,255,255,0.05)",
                border: i === 1 ? "1px solid rgba(255,109,31,0.4)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                color: i === 1 ? "#ff6d1f" : "rgba(255,255,255,0.5)",
                fontSize: "16px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.5px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
