import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Christopher Jones – Software Developer & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111111",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
        }}
      >
        {/* Top: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Eyebrow label */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#585858",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "92px",
              fontWeight: "900",
              color: "#DEDDCD",
              letterSpacing: "-3px",
              lineHeight: "1",
              marginTop: "8px",
            }}
          >
            Christopher
          </div>
          <div
            style={{
              fontSize: "92px",
              fontWeight: "900",
              color: "#DEDDCD",
              letterSpacing: "-3px",
              lineHeight: "1",
              marginTop: "-16px",
            }}
          >
            Jones
          </div>

          {/* Divider */}
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "#585858",
              marginTop: "4px",
            }}
          />

          {/* Role */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "400",
              color: "#585858",
              letterSpacing: "0.5px",
            }}
          >
            Software Developer · ML Engineer
          </div>
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#585858",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            chris-jones.co.uk
          </div>
          {/* Decorative dots */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: i === 3 ? "#DEDDCD" : "#585858",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
