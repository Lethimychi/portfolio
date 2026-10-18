import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS = [
  { value: "4,800+", label: "test cases" },
  { value: "145+", label: "defects found" },
  { value: "20+", label: "sprints owned" },
];

const CHECKS = ["Manual & API testing", "SQL data validation", "Playwright automation"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #020617 0%, #0b1a3a 55%, #1e1b4b 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#94a3b8" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
          {profile.availability}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#06b6d4", letterSpacing: 4, textTransform: "uppercase" }}>
            {profile.role}
          </div>
          <div style={{ marginTop: 12, fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            {CHECKS.map((check) => (
              <div
                key={check}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(16,185,129,0.35)",
                  background: "rgba(16,185,129,0.12)",
                  color: "#6ee7b7",
                  fontSize: 22,
                }}
              >
                <span style={{ color: "#10b981" }}>PASS</span>
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 56 }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 48, fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: 22, color: "#94a3b8" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: "#3b82f6" }}>mychi.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
