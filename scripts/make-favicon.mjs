// Builds the favicon set from the About portrait (public/julio-halcyon.webp).
// Uses macOS `sips` for crop/resize, so no new dependency is needed.
// Run: node scripts/make-favicon.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SOURCE = "public/julio-halcyon.webp"; // 1448×1086
// Square crop around head, glasses, beard and a little neck (source pixels).
const CROP = { x: 428, y: 38, size: 324 };

const tmp = mkdtempSync(join(tmpdir(), "favicon-"));
const sips = (...args) => execFileSync("sips", args, { stdio: "ignore" });

const master = join(tmp, "master.png");
sips("-s", "format", "png", SOURCE, "--out", join(tmp, "src.png"));
sips("--cropOffset", String(CROP.y), String(CROP.x), "-c", String(CROP.size), String(CROP.size), join(tmp, "src.png"), "--out", master);

// Every size is downsampled straight from the master.
const png = (size) => {
  const out = join(tmp, `${size}.png`);
  sips("-z", String(size), String(size), master, "--out", out);
  return readFileSync(out);
};

// ICO with embedded PNG frames (valid since Windows Vista; all modern browsers).
function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = 6 + 16 * frames.length;
  const entries = frames.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size % 256, 0);
    e.writeUInt8(size % 256, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]);
}

writeFileSync("app/favicon.ico", ico([16, 32, 48].map((size) => ({ size, data: png(size) }))));
writeFileSync("app/icon.png", png(32));
writeFileSync("app/apple-icon.png", png(180));
console.log("Wrote app/favicon.ico (16/32/48), app/icon.png (32), app/apple-icon.png (180)");
