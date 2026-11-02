"""
Generate the site's favicons from the AK logo.

    python3 scripts/favicon.py

Source: scripts/assets/ak-logo.png (black mark on transparent, any size).
The mark is redrawn in white on a rounded square of the site's dark colour,
so it stays visible in both light and dark browser tabs.

Writes to public/:
  favicon.ico           16, 32, 48 px (real ICO, for tabs and bookmarks)
  icon-192.png          192 px (high-DPI tabs, Android)
  apple-touch-icon.png  180 px, square, no transparency (iOS rounds it itself)
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "assets" / "ak-logo.png"
PUB = ROOT / "public"

BG = (21, 15, 31)        # #150f1f, the site's theme-color
FG = (255, 255, 255)


def mark():
    """The logo's shape as an alpha mask, cropped tight to the glyphs."""
    alpha = Image.open(SRC).convert("RGBA").split()[3]
    return alpha.crop(alpha.getbbox())


def icon(size, pad, radius, ss=8):
    """Draw at ss x size and downsample, so small sizes stay crisp."""
    S = size * ss
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if radius is None:
        d.rectangle((0, 0, S, S), fill=BG)
    else:
        d.rounded_rectangle((0, 0, S - 1, S - 1), radius=radius * S, fill=BG)
    m = mark()
    box = S * (1 - 2 * pad)
    scale = box / max(m.size)
    m = m.resize((round(m.width * scale), round(m.height * scale)), Image.LANCZOS)
    glyph = Image.new("RGBA", m.size, FG)
    img.paste(glyph, ((S - m.width) // 2, (S - m.height) // 2), m)
    return img.resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    # tight padding at tab sizes so the letters stay legible at 16px
    sizes = {16: icon(16, 0.08, 0.22), 32: icon(32, 0.10, 0.22), 48: icon(48, 0.12, 0.22)}
    sizes[48].save(PUB / "favicon.ico", sizes=[(s, s) for s in sizes],
                   append_images=[sizes[16], sizes[32]])
    icon(192, 0.16, 0.22).save(PUB / "icon-192.png", optimize=True)
    icon(180, 0.18, None).convert("RGB").save(PUB / "apple-touch-icon.png", optimize=True)
    for f in ("favicon.ico", "icon-192.png", "apple-touch-icon.png"):
        print("wrote", PUB / f, (PUB / f).stat().st_size, "bytes")
