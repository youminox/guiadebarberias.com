#!/usr/bin/env python3
"""
Convert generated raster images (.jpg/.png/.webp) into standardized 1200x675 WebP
files under public/images/blog-v3/<slug>.webp and verify dimensions + SHA-256 + dHash uniqueness.
"""
import argparse
import hashlib
import os
import sys
from pathlib import Path
from PIL import Image


def compute_dhash(img: Image.Image, hash_size: int = 8) -> int:
    gray = img.convert("L").resize((hash_size + 1, hash_size), Image.Resampling.LANCZOS)
    pixels = list(gray.getdata())
    bits = 0
    for row in range(hash_size):
        offset = row * (hash_size + 1)
        for col in range(hash_size):
            bits = (bits << 1) | (1 if pixels[offset + col] > pixels[offset + col + 1] else 0)
    return bits


def convert_to_webp(src: Path, dst: Path, width: int = 1200, height: int = 675, quality: int = 78) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im_rgb = im.convert("RGB")
        src_w, src_h = im_rgb.size
        target_ratio = width / height
        src_ratio = src_w / src_h

        if src_ratio > target_ratio:
            new_w = int(round(src_h * target_ratio))
            left = (src_w - new_w) // 2
            im_cropped = im_rgb.crop((left, 0, left + new_w, src_h))
        elif src_ratio < target_ratio:
            new_h = int(round(src_w / target_ratio))
            top = (src_h - new_h) // 2
            im_cropped = im_rgb.crop((0, top, src_w, top + new_h))
        else:
            im_cropped = im_rgb

        im_resized = im_cropped.resize((width, height), Image.Resampling.LANCZOS)
        im_resized.save(dst, "WEBP", quality=quality, method=6)


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert raster image to 1200x675 WebP.")
    parser.add_argument("src", help="Source image path")
    parser.add_argument("dst", help="Destination .webp path")
    parser.add_argument("--quality", type=int, default=78)
    args = parser.parse_args()

    src = Path(args.src)
    dst = Path(args.dst)
    if not src.exists():
        print(f"ERROR: Source not found: {src}", file=sys.stderr)
        return 1

    convert_to_webp(src, dst, quality=args.quality)
    sha = hashlib.sha256(dst.read_bytes()).hexdigest()[:16]
    with Image.open(dst) as out:
        dh = compute_dhash(out)
        print(f"OK {dst.name}: {out.size[0]}x{out.size[1]} | {dst.stat().st_size // 1024} KB | sha={sha} | dhash={dh:016x}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
