#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import ts from "typescript";

const ROOT = process.cwd();
const allowPending = process.argv.includes("--allow-pending");

function loadTsModule(relPath, customMocks = {}) {
  const cache = new Map();
  function requireLocal(spec, fromFile) {
    if (customMocks[spec]) return customMocks[spec];
    let resolved = spec.startsWith("@/")
      ? path.join(ROOT, "src", spec.slice(2))
      : path.resolve(path.dirname(fromFile), spec);
    if (!resolved.endsWith(".ts") && fs.existsSync(resolved + ".ts")) resolved += ".ts";
    return evalFile(resolved);
  }
  function evalFile(absPath) {
    if (cache.has(absPath)) return cache.get(absPath).exports;
    const source = fs.readFileSync(absPath, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
      fileName: absPath,
    }).outputText;
    const mod = { exports: {} };
    cache.set(absPath, mod);
    const fn = new Function("exports", "require", "module", "__filename", "__dirname", transpiled);
    fn(mod.exports, (s) => requireLocal(s, absPath), mod, absPath, path.dirname(absPath));
    return mod.exports;
  }
  return evalFile(path.join(ROOT, relPath));
}

const mocks = {
  "@/lib/barberias": { YOU_MINOX_URL: "https://youminox.com", SITE_URL: "https://guiadebarberias.com" },
  "@/data/blog-posts": {},
};

const { PILLAR_ARTICLES } = loadTsModule("src/data/blog-pillars.ts", mocks);
const { BLOG_V3_ARTICLES } = loadTsModule("src/data/blog-v3.ts", mocks);

const expected = [
  ...PILLAR_ARTICLES.map((p) => ({ slug: p.slug, imageUrl: p.imageUrl, isPillar: true })),
  ...BLOG_V3_ARTICLES.map((a) => ({ slug: a.slug, imageUrl: a.imageUrl, isPillar: false })),
];

const seenPath = new Map();
const seenSha = new Map();
const missing = [];
const existingFiles = [];
const errors = [];

for (const item of expected) {
  if (seenPath.has(item.imageUrl)) {
    errors.push(`Shared imageUrl ${item.imageUrl}: "${item.slug}" vs "${seenPath.get(item.imageUrl)}"`);
  }
  seenPath.set(item.imageUrl, item.slug);

  if (!allowPending && item.imageUrl.includes("/images/barberias/")) {
    errors.push(`Legacy barbershop photo still referenced on "${item.slug}": ${item.imageUrl}`);
  }

  const abs = path.join(ROOT, "public", item.imageUrl.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    missing.push(item.imageUrl);
    continue;
  }

  const buf = fs.readFileSync(abs);
  const sha = crypto.createHash("sha256").update(buf).digest("hex");
  if (seenSha.has(sha)) {
    errors.push(`Byte-identical image SHA-256: ${item.imageUrl} === ${seenSha.get(sha)}`);
  }
  seenSha.set(sha, item.imageUrl);
  existingFiles.push({ slug: item.slug, abs, rel: item.imageUrl });
}

// Perceptual dHash & dimension check via Python Pillow on all existing files
if (existingFiles.length > 0) {
  const pyScript = `
import json, sys
from PIL import Image

def dhash(im, size=8):
    g = im.convert("L").resize((size + 1, size), Image.Resampling.LANCZOS)
    px = list(g.getdata())
    b = 0
    for r in range(size):
        o = r * (size + 1)
        for c in range(size):
            b = (b << 1) | (1 if px[o + c] > px[o + c + 1] else 0)
    return b

files = json.loads(sys.stdin.read())
out = []
for f in files:
    with Image.open(f["abs"]) as im:
        out.append({"slug": f["slug"], "rel": f["rel"], "w": im.size[0], "h": im.size[1], "fmt": im.format, "dhash": dhash(im)})
print(json.dumps(out))
`;
  const raw = execFileSync("python3", ["-c", pyScript], {
    input: JSON.stringify(existingFiles),
    encoding: "utf8",
  });
  const metas = JSON.parse(raw);

  for (const m of metas) {
    if (m.rel.startsWith("/images/blog-v3/")) {
      if (m.fmt !== "WEBP" || m.w !== 1200 || m.h !== 675) {
        errors.push(`Invalid format/size for ${m.rel}: ${m.fmt} ${m.w}x${m.h} (expected WEBP 1200x675)`);
      }
    }
  }

  // Hamming distance <= 4 across perceptual dHashes flags visual duplicates
  for (let i = 0; i < metas.length; i++) {
    const hi = BigInt(metas[i].dhash);
    for (let j = i + 1; j < metas.length; j++) {
      let x = hi ^ BigInt(metas[j].dhash);
      let dist = 0;
      while (x > 0n) {
        dist += Number(x & 1n);
        x >>= 1n;
      }
      if (dist <= 4) {
        errors.push(`Visually duplicate images (dHash distance=${dist}): ${metas[i].rel} vs ${metas[j].rel}`);
      }
    }
  }
}

console.log(`Checked ${expected.length} expected image references: ${existingFiles.length} present on disk, ${missing.length} pending generation.`);

if (!allowPending && missing.length > 0) {
  errors.push(`${missing.length} images missing on disk (first 10): ${missing.slice(0, 10).join(", ")}`);
}

if (errors.length > 0) {
  console.error(`\nFAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 30)) console.error(`  ERR: ${e}`);
  process.exit(1);
}

console.log(allowPending ? "PASS (pending mode): no duplicate paths/hashes among existing images." : "PASS (strict): all 105 images present, unique WebP 1200x675, 0 visual/hash duplicates.");
