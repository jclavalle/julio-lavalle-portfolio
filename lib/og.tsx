import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link-preview image (1200×630) in the homepage look: navy ground, Saira
// headline, Plex Mono ledger, the single green accent.
export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  ground: "#10141C",
  ink: "#EDE9DE",
  ink2: "#C9C4B6",
  muted: "#8A8578",
  rule: "rgba(237,233,222,.22)",
  green: "#5FA88C",
};

const asset = (name: string) => readFileSync(join(process.cwd(), "assets/og", name));

const fonts = () => [
  { name: "Saira", data: asset("saira-500.ttf"), weight: 500 as const, style: "normal" as const },
  { name: "Mono", data: asset("plexmono-400.ttf"), weight: 400 as const, style: "normal" as const },
  { name: "Barlow", data: asset("barlow-400.ttf"), weight: 400 as const, style: "normal" as const },
];

// Portrait-led: the About illustration on the right fading into the navy.
export function stageImage() {
  const portrait = `data:image/jpeg;base64,${asset("portrait-stage.jpg").toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: C.ground, color: C.ink }}>
        <img src={portrait} width={603} height={630} style={{ position: "absolute", right: 0, top: 0 }} />
        <div style={{ position: "absolute", right: 363, top: 0, width: 240, height: 630, display: "flex", backgroundImage: `linear-gradient(90deg, ${C.ground}, rgba(16,20,28,0))` }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 0 56px 80px", width: 680 }}>
          <div style={{ fontFamily: "Mono", fontSize: 24, color: C.green }}>Product leader &amp; founder</div>
          <div style={{ fontFamily: "Saira", fontSize: 92, lineHeight: 1, letterSpacing: "-0.02em", marginTop: 26 }}>Julio Lavalle</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Barlow", fontSize: 34, lineHeight: 1.35, color: C.ink2, marginTop: 30 }}>
            <span style={{ display: "flex" }}>
              <span>Building</span>
              <span style={{ color: C.green, marginLeft: 9, marginRight: 9 }}>AI-native</span>
              <span>and fintech</span>
            </span>
            <span>products, from 0→1 to scale.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", paddingTop: 22, borderTop: `1px solid ${C.rule}`, fontFamily: "Mono", fontSize: 21, color: C.muted, width: 520 }}>
            <span style={{ color: C.ink2 }}>juliolavalle.com</span>
            <span style={{ marginTop: 6 }}>Currently building StableFlow</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts() },
  );
}
