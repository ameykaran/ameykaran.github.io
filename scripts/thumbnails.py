"""
Generate project thumbnails that blend into the portfolio's project cards.

    python3 scripts/thumbnails.py            # all thumbnails
    python3 scripts/thumbnails.py mapcode    # just one (by output name)
    python3 scripts/thumbnails.py mapcode --sheet /tmp/sheet.png
                                             # + preview next to existing ones

Design rules
- Background is the card's rendered colour, so the image has no visible edge.
- 960x320 (3:1) = the card's image box (476x160) at 2x for retina screens.
- Phones show a narrower slice (~2.2:1), so key content stays in x 130..830.
- Everything is drawn at 2x and downscaled for anti-aliased lines.
- Colours are the site's accent tokens from src/index.css.
"""

import colorsys
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "public" / "projects"
W, H = 960, 320
SS = 2  # supersampling factor

# ---------------------------------------------------------------- palette
BG = (12, 18, 32)  # rendered colour of .glass-card over the page background


def hsl(h, s, l):
    r, g, b = colorsys.hls_to_rgb(h / 360, l / 100, s / 100)
    return (round(r * 255), round(g * 255), round(b * 255))


BLUE = hsl(222, 80, 65)
MINT = hsl(168, 60, 55)
SUN = hsl(42, 95, 63)
VIOLET = hsl(262, 70, 72)
RED = hsl(350, 75, 66)
TEXT = (220, 224, 236)
DIM = (96, 106, 132)
LINE = (44, 54, 80)


def mix(c, t, bg=BG):
    """Colour c at opacity t over the background."""
    return tuple(round(bg[i] + (c[i] - bg[i]) * t) for i in range(3))


# ---------------------------------------------------------------- fonts
MONO = "/usr/share/fonts/TTF/JetBrainsMono-Regular.ttf"
MONO_B = "/usr/share/fonts/TTF/JetBrainsMono-Bold.ttf"
SANS = "/usr/share/fonts/noto/NotoSans-Medium.ttf"
SANS_B = "/usr/share/fonts/noto/NotoSans-Bold.ttf"
DEVA = "/usr/share/fonts/noto/NotoSansDevanagari-Medium.ttf"

_fonts = {}


def font(path, size):
    key = (path, size)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(path, size * SS)
    return _fonts[key]


# ---------------------------------------------------------------- canvas helpers
class Canvas:
    """Draw in 960x320 logical coordinates; rendered at SS x."""

    def __init__(self):
        self.img = Image.new("RGB", (W * SS, H * SS), BG)
        self.d = ImageDraw.Draw(self.img)

    @staticmethod
    def _p(*xy):
        return [v * SS for v in xy]

    def text(self, x, y, s, size=16, fill=TEXT, path=MONO, anchor="la"):
        self.d.text(self._p(x, y), s, font=font(path, size), fill=fill, anchor=anchor)

    def textlen(self, s, size=16, path=MONO):
        return self.d.textlength(s, font=font(path, size)) / SS

    def line(self, x1, y1, x2, y2, fill=LINE, width=1.5):
        self.d.line(self._p(x1, y1, x2, y2), fill=fill, width=max(1, round(width * SS)))

    def poly(self, pts, fill=None, outline=None, width=1.5):
        flat = [v * SS for p in pts for v in p]
        self.d.polygon(flat, fill=fill)
        if outline:
            self.d.line(flat + flat[:2], fill=outline, width=round(width * SS), joint="curve")

    def rect(self, x, y, w, h, fill=None, outline=None, r=8, width=1.5):
        self.d.rounded_rectangle(self._p(x, y, x + w, y + h), radius=r * SS,
                                 fill=fill, outline=outline,
                                 width=round(width * SS) if outline else 0)

    def circle(self, cx, cy, r, fill=None, outline=None, width=1.5):
        self.d.ellipse(self._p(cx - r, cy - r, cx + r, cy + r), fill=fill,
                       outline=outline, width=round(width * SS) if outline else 0)

    def arrow(self, x1, y1, x2, y2, fill=DIM, width=1.5, head=7):
        self.line(x1, y1, x2, y2, fill, width)
        a = math.atan2(y2 - y1, x2 - x1)
        p1 = (x2 - head * math.cos(a - 0.45), y2 - head * math.sin(a - 0.45))
        p2 = (x2 - head * math.cos(a + 0.45), y2 - head * math.sin(a + 0.45))
        self.poly([(x2, y2), p1, p2], fill=fill)

    def pill(self, cx, cy, label, colour, size=13, pad=12, h=26, path=SANS):
        w = self.textlen(label, size, path) + 2 * pad
        self.rect(cx - w / 2, cy - h / 2, w, h, fill=mix(colour, 0.14),
                  outline=mix(colour, 0.55), r=h / 2, width=1.2)
        self.text(cx, cy, label, size, colour, path, anchor="mm")
        return w

    def box(self, x, y, w, h, colour, label=None, size=13, r=10, path=SANS, t=0.12):
        self.rect(x, y, w, h, fill=mix(colour, t), outline=mix(colour, 0.6), r=r, width=1.3)
        if label:
            self.text(x + w / 2, y + h / 2, label, size, colour, path, anchor="mm")

    def code(self, x, y, lines, size=17, lh=28):
        """lines: list of [(text, colour), ...]; keywords drawn bold."""
        for ln in lines:
            cx = x
            for s, c in ln:
                p = MONO_B if c in (VIOLET,) else MONO
                self.text(cx, y, s, size, c, p)
                cx += self.textlen(s, size, p)
            y += lh

    def save(self, name):
        out = self.img.resize((W, H), Image.LANCZOS)
        OUT.mkdir(parents=True, exist_ok=True)
        out.save(OUT / f"{name}.jpg", quality=90, optimize=True, progressive=True)
        print("wrote", OUT / f"{name}.jpg")


# ================================================================ thumbnails
THUMBS = {}


def thumb(name):
    def reg(fn):
        THUMBS[name] = fn
        return fn
    return reg


@thumb("learnai")
def learnai():
    c = Canvas()
    # ingestion: documents -> chunks
    for i, (lbl, col) in enumerate([("textbook.pdf", BLUE), ("article.pdf", BLUE), ("exam.pdf", BLUE)]):
        y = 92 + i * 52
        c.box(140, y, 120, 36, col, lbl, 12, path=MONO)
    c.text(200, 262, "OCR · semantic chunking", 15, DIM, MONO, "mm")
    c.arrow(268, 160, 330, 160, DIM)
    # chunks
    for i in range(5):
        c.rect(340, 104 + i * 23, 70, 15, fill=mix(MINT, 0.12 + 0.05 * i), outline=mix(MINT, 0.5), r=4, width=1)
    c.arrow(420, 160, 482, 160, DIM)
    # hub + five agents
    hx, hy = 560, 160
    agents = ["onboarding", "assessment", "content", "reports", "knowledge"]
    for i, a in enumerate(agents):
        ang = math.radians(-60 + i * 30)
        ax, ay = hx + 185 * math.cos(ang), hy + 120 * math.sin(ang)
        c.line(hx + 50, hy, ax - 52, ay, mix(VIOLET, 0.45), 1.3)
        c.pill(ax, ay, a, VIOLET, 13)
    c.circle(hx, hy, 50, fill=mix(BLUE, 0.16), outline=mix(BLUE, 0.7), width=2)
    c.text(hx, hy - 8, "learner", 14, BLUE, SANS_B, "mm")
    c.text(hx, hy + 12, "profile", 14, BLUE, SANS_B, "mm")
    c.save("learnai")


@thumb("dilleix")
def dilleix():
    c = Canvas()
    rows = [
        ("English", ["Hel", "lo", " wor", "ld"], SANS, BLUE),
        ("Hindi", ["नम", "स्", "ते", " दुनिया"], DEVA, SUN),
        ("Mizo", ["Chi", "bai", " khaw", "vel"], SANS, MINT),
    ]
    for i, (lang, toks, path, col) in enumerate(rows):
        y = 90 + i * 64
        c.text(140, y + 15, lang, 15, DIM, MONO, "lm")
        x = 220
        for t in toks:
            w = c.textlen(t, 16, path) + 18
            c.rect(x, y, w, 30, fill=mix(col, 0.15), outline=mix(col, 0.55), r=6, width=1.2)
            c.text(x + w / 2, y + 15, t, 16, col, path, "mm")
            x += w + 6
        c.arrow(x + 10, y + 15, 520, 160, mix(DIM, 0.8), 1.2, 6)
    c.text(330, 284, "byte-level BPE · 3B tokens", 15, DIM, MONO, "mm")
    # transformer stack
    for i in range(6):
        c.rect(530 + i * 9, 74 + i * 9, 190, 150, fill=mix(VIOLET, 0.06 + i * 0.025),
               outline=mix(VIOLET, 0.25 + i * 0.08), r=12, width=1.2)
    c.text(530 + 45 + 95, 74 + 45 + 60, "150M", 30, VIOLET, SANS_B, "mm")
    c.text(530 + 45 + 95, 74 + 45 + 96, "params · from scratch", 12, DIM, MONO, "mm")
    c.save("dilleix")


@thumb("ocr-crnn")
def ocr_crnn():
    c = Canvas()
    # word image
    c.rect(140, 110, 170, 80, fill=(230, 232, 238), r=6)
    c.text(225, 150, "amsel", 34, (30, 34, 48), "/usr/share/fonts/noto/NotoSerif-Italic.ttf"
           if Path("/usr/share/fonts/noto/NotoSerif-Italic.ttf").exists() else SANS, "mm")
    c.text(225, 214, "input image", 15, DIM, MONO, "mm")
    c.arrow(318, 150, 356, 150, DIM)
    # CNN feature columns
    random.seed(3)
    for i in range(10):
        for j in range(5):
            t = 0.1 + random.random() * 0.5
            c.rect(366 + i * 14, 108 + j * 17, 11, 14, fill=mix(BLUE, t), r=2)
    c.text(436, 214, "CNN encoder", 15, DIM, MONO, "mm")
    c.arrow(512, 150, 550, 150, DIM)
    # RNN chain
    for i in range(5):
        x = 568 + i * 46
        c.box(x, 128, 34, 44, VIOLET, None, r=8)
        if i:
            c.arrow(x - 12, 150, x - 1, 150, mix(VIOLET, 0.7), 1.3, 5)
        c.arrow(x + 17, 125, x + 17, 100, mix(MINT, 0.7), 1.3, 5)
        c.text(x + 17, 84, "amsel"[i], 20, MINT, MONO_B, "mm")
    c.text(670, 214, "RNN decoder", 15, DIM, MONO, "mm")
    c.save("ocr-crnn")


@thumb("cv-oriented-bbox")
def cv_a3():
    c = Canvas()
    # panel 1: oriented boxes
    def rbox(cx, cy, w, h, deg, col, width=2):
        a = math.radians(deg)
        pts = []
        for dx, dy in [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]:
            pts.append((cx + dx * math.cos(a) - dy * math.sin(a), cy + dx * math.sin(a) + dy * math.cos(a)))
        c.poly(pts, outline=col, width=width)
        return pts
    for cx, cy, w, h, deg in [(205, 120, 120, 34, -18), (232, 186, 100, 30, 12)]:
        # faint "text" strokes inside
        a = math.radians(deg)
        for k in range(-3, 4):
            px, py = cx + k * 13 * math.cos(a), cy + k * 13 * math.sin(a)
            c.circle(px, py, 4.5, fill=mix(TEXT, 0.35))
        rbox(cx, cy, w + 10, h + 6, deg + 3, mix(MINT, 0.9), 1.6)
        rbox(cx, cy, w, h, deg, BLUE, 2)
    c.text(215, 262, "oriented boxes · θ", 15, DIM, MONO, "mm")
    # panel 2: segmentation + depth
    cols = [VIOLET, BLUE, MINT, SUN]
    random.seed(7)
    for i in range(9):
        for j in range(7):
            k = 0 if j < 2 else (1 if i < 4 and j < 5 else (2 if j < 5 else 3))
            c.rect(370 + i * 22, 82 + j * 22, 20, 20, fill=mix(cols[k], 0.22 + 0.12 * (j / 7)), r=3)
    c.text(468, 262, "segmentation + depth", 15, DIM, MONO, "mm")
    # panel 3: point cloud (a projected chair-ish torus)
    random.seed(11)
    for _ in range(420):
        u, v = random.uniform(0, 2 * math.pi), random.uniform(0, 2 * math.pi)
        R, r = 52, 20
        x = (R + r * math.cos(v)) * math.cos(u)
        y = (R + r * math.cos(v)) * math.sin(u)
        z = r * math.sin(v)
        px, py = 720 + x, 165 + y * 0.45 - z * 0.9
        depth = (y + R + r) / (2 * (R + r))
        c.circle(px, py, 1.6, fill=mix(VIOLET, 0.35 + 0.6 * depth))
    c.text(720, 262, "PointNet", 15, DIM, MONO, "mm")
    c.save("cv-oriented-bbox")


@thumb("cv-vit-attention")
def cv_a4():
    c = Canvas()
    # patch grid with attention heat
    n, s = 6, 26
    x0, y0 = 150, 82
    for i in range(n):
        for j in range(n):
            d = math.hypot(i - 2.6, j - 2.2)
            t = max(0.08, 0.85 - d * 0.22)
            c.rect(x0 + i * s, y0 + j * s, s - 3, s - 3, fill=mix(SUN, t), r=3)
    c.text(x0 + n * s / 2, 262, "patches · attention", 15, DIM, MONO, "mm")
    c.arrow(320, 160, 360, 160, DIM)
    # token sequence
    c.box(372, 146, 40, 28, VIOLET, "CLS", 10, r=5, path=MONO_B)
    for i in range(7):
        c.rect(418 + i * 24, 146, 20, 28, fill=mix(BLUE, 0.15 + 0.08 * (i % 3)), outline=mix(BLUE, 0.5), r=4, width=1)
    c.text(470, 262, "ViT / CvT encoder", 15, DIM, MONO, "mm")
    c.arrow(594, 160, 634, 160, DIM)
    # CLIP prefix -> caption
    for i in range(4):
        c.rect(646 + i * 18, 146, 14, 28, fill=mix(MINT, 0.35), r=3)
    c.text(726, 160, "→", 16, DIM, MONO, "lm")
    c.text(750, 140, "“a dog on", 15, TEXT, SANS, "lm")
    c.text(750, 162, " the grass”", 15, TEXT, SANS, "lm")
    c.text(740, 262, "CLIP prefix → GPT-2", 15, DIM, MONO, "mm")
    c.save("cv-vit-attention")


@thumb("legends-of-stonks")
def stonks():
    c = Canvas()
    random.seed(21)
    price = 150
    x = 140
    # gridlines
    for gy in (90, 150, 210):
        c.line(140, gy, 640, gy, mix(LINE, 0.6), 1)
    for i in range(22):
        o = price
        price += random.uniform(-14, 18) - 2.2
        cl = price
        hi, lo = max(o, cl) + random.uniform(3, 12), min(o, cl) - random.uniform(3, 12)
        col = MINT if cl < o else RED  # y grows downward: smaller y = higher price
        c.line(x + 7, hi, x + 7, lo, col, 1.4)
        c.rect(x + 2, min(o, cl), 10, max(3, abs(cl - o)), fill=col, r=1.5)
        x += 22
    # gamification
    c.box(680, 90, 150, 140, VIOLET, None, r=14, t=0.10)
    c.text(755, 118, "LEVEL 3", 16, VIOLET, SANS_B, "mm")
    c.rect(700, 140, 110, 10, fill=mix(VIOLET, 0.2), r=5)
    c.rect(700, 140, 74, 10, fill=VIOLET, r=5)
    c.text(755, 168, "740 / 1000 XP", 15, DIM, MONO, "mm")
    c.pill(755, 204, "7 microservices", MINT, 11, 10, 22, MONO)
    c.save("legends-of-stonks")


@thumb("rudra-subscription")
def rudra():
    c = Canvas()

    def uml(x, y, name, attrs, col, w=150):
        h = 34 + 20 * len(attrs)
        c.rect(x, y, w, h, fill=mix(col, 0.10), outline=mix(col, 0.6), r=6, width=1.3)
        c.text(x + w / 2, y + 17, name, 13, col, SANS_B, "mm")
        c.line(x, y + 32, x + w, y + 32, mix(col, 0.5), 1)
        for i, a in enumerate(attrs):
            c.text(x + 12, y + 44 + i * 20, a, 14, DIM, MONO, "lm")
        return h
    uml(150, 70, "FeedService", ["+ syncFeeds()", "+ parse()", "+ notify()", "+ persist()"], RED, 160)
    c.pill(230, 230, "design smell", RED, 11, 10, 22, MONO)
    c.arrow(330, 140, 400, 140, DIM, 1.6)
    c.text(365, 120, "refactor", 14, DIM, MONO, "mm")
    uml(420, 60, "FeedSyncer", ["+ sync()"], MINT)
    uml(420, 160, "FeedParser", ["+ parse()"], MINT)
    uml(620, 110, "«interface»", ["Observer", "+ update()"], BLUE, 150)
    c.line(570, 90, 620, 140, mix(BLUE, 0.6), 1.2)
    c.line(570, 190, 620, 160, mix(BLUE, 0.6), 1.2)
    # RSS glyph
    cx, cy = 790, 72
    c.circle(cx - 12, cy + 12, 4, fill=SUN)
    for r in (14, 24):
        c.d.arc(c._p(cx - 12 - r, cy + 12 - r, cx - 12 + r, cy + 12 + r), 270, 360, fill=SUN, width=3 * SS)
    c.save("rudra-subscription")


@thumb("tiny-tots")
def tiny_tots():
    c = Canvas()
    x0, x1, yb = 170, 640, 250
    c.line(x0, yb, x1, yb, LINE, 1.4)
    c.line(x0, 70, x0, yb, LINE, 1.4)
    for k, (scale, col) in enumerate([(0.75, mix(BLUE, 0.5)), (1.0, BLUE), (1.25, mix(BLUE, 0.5))]):
        pts = []
        for i in range(60):
            t = i / 59
            y = yb - scale * 140 * (1 - math.exp(-3 * t)) - 10
            pts.append((x0 + t * (x1 - x0), y))
        for a, b in zip(pts, pts[1:]):
            c.line(*a, *b, col, 2 if k == 1 else 1.4)
        c.text(x1 + 10, pts[-1][1], ["P3", "P50", "P97"][k], 12, col, MONO, "lm")
    random.seed(4)
    for i in range(8):
        t = (i + 1) / 9
        y = yb - 1.05 * 140 * (1 - math.exp(-3 * t)) - 10 + random.uniform(-6, 6)
        c.circle(x0 + t * (x1 - x0), y, 5, fill=MINT, outline=BG, width=2)
    c.text((x0 + x1) / 2, 274, "age (months)", 15, DIM, MONO, "mm")
    # milestone card
    c.box(700, 100, 130, 110, SUN, None, r=14, t=0.10)
    c.text(765, 130, "6 mo", 18, SUN, SANS_B, "mm")
    c.text(765, 160, "7.9 kg", 14, TEXT, MONO, "mm")
    c.text(765, 184, "on track", 12, MINT, MONO, "mm")
    c.save("tiny-tots")


@thumb("recruitment-portal")
def recruitment():
    c = Canvas()
    cols = [("Posted", BLUE, 2), ("Applied", VIOLET, 3), ("Interview", SUN, 2), ("Hired", MINT, 1)]
    x = 140
    for i, (name, col, n) in enumerate(cols):
        c.text(x + 75, 82, name, 14, col, SANS_B, "mm")
        c.line(x, 98, x + 150, 98, mix(col, 0.5), 1.5)
        for k in range(n):
            y = 110 + k * 50
            c.rect(x, y, 150, 40, fill=mix(col, 0.10), outline=mix(col, 0.4), r=8, width=1.1)
            c.circle(x + 20, y + 20, 9, fill=mix(col, 0.5))
            c.rect(x + 36, y + 12, 70 + 20 * ((k + i) % 2), 7, fill=mix(TEXT, 0.35), r=3)
            c.rect(x + 36, y + 24, 45, 6, fill=mix(TEXT, 0.18), r=3)
        if i < 3:
            c.arrow(x + 154, 82, x + 172, 82, DIM, 1.3, 5)
        x += 176
    c.text(480, 282, "CAS sign-in · job posting · applications · interview scheduling", 15, DIM, MONO, "mm")
    c.save("recruitment-portal")


@thumb("uno-cards")
def uno():
    c = Canvas()
    cards = [(RED, "7", -14), (BLUE, "2", -4), (MINT, "+2", 6), (SUN, "9", 16)]
    for i, (col, lbl, deg) in enumerate(cards):
        cx, cy = 300 + i * 95, 165
        w, h = 84, 124
        a = math.radians(deg)

        def rot(dx, dy):
            return (cx + dx * math.cos(a) - dy * math.sin(a), cy + dx * math.sin(a) + dy * math.cos(a))
        body = [rot(-w / 2, -h / 2), rot(w / 2, -h / 2), rot(w / 2, h / 2), rot(-w / 2, h / 2)]
        c.poly(body, fill=mix(col, 0.85), outline=mix(TEXT, 0.9), width=2)
        # inner ellipse approximated by polygon
        ell = [rot(28 * math.cos(t) * 0.9 - 6 * math.sin(t), 50 * math.sin(t))
               for t in [k * math.pi / 24 for k in range(48)]]
        c.poly(ell, fill=mix(TEXT, 0.9, col))
        c.text(cx, cy, lbl, 30, col, SANS_B, "mm")
        # detection box
        pad = 12
        xs, ys = [p[0] for p in body], [p[1] for p in body]
        c.rect(min(xs) - pad / 2, min(ys) - pad / 2, max(xs) - min(xs) + pad, max(ys) - min(ys) + pad,
               outline=mix(MINT, 0.9), r=4, width=1.4)
    c.text(480, 274, "template matching → colour + value", 15, DIM, MONO, "mm")
    c.save("uno-cards")


@thumb("akonsole")
def akonsole():
    c = Canvas()
    x, y, w, h = 150, 40, 660, 240
    c.rect(x, y, w, h, fill=mix(TEXT, 0.03), outline=mix(TEXT, 0.15), r=12, width=1.2)
    for i, col in enumerate((RED, SUN, MINT)):
        c.circle(x + 22 + i * 18, y + 18, 5, fill=mix(col, 0.8))
    c.line(x, y + 36, x + w, y + 36, mix(TEXT, 0.1), 1)
    P = [("amey@akonsole", MINT), (":", DIM), ("~/src", BLUE), ("$ ", DIM)]
    lines = [
        P + [("ls -l ", TEXT), ("|", VIOLET), (" grep .c ", TEXT), (">", VIOLET), (" files.txt", TEXT)],
        P + [("sleep 30 ", TEXT), ("&", VIOLET)],
        [("[1] 4821", DIM)],
        P + [("cat ", TEXT), ("<", VIOLET), (" files.txt ", TEXT), ("|", VIOLET), (" wc -l", TEXT)],
        [("4", TEXT)],
        P + [("▌", TEXT)],
    ]
    c.code(x + 22, y + 52, lines, 16, 30)
    c.save("akonsole")


@thumb("matrix-multiplication")
def matmul():
    c = Canvas()
    # A x B = C
    def mat(x, y, col, n=4, s=16, hi=None):
        for i in range(n):
            for j in range(n):
                on = hi and hi(i, j)
                c.rect(x + j * s, y + i * s, s - 3, s - 3, fill=mix(col, 0.7 if on else 0.18), r=2)
    mat(140, 120, BLUE, hi=lambda i, j: i == 1)
    c.text(215, 150, "×", 22, DIM, SANS, "mm")
    mat(230, 120, VIOLET, hi=lambda i, j: j == 2)
    c.text(305, 150, "=", 22, DIM, SANS, "mm")
    mat(320, 120, MINT, hi=lambda i, j: i == 1 and j == 2)
    # speedup bars (log-ish, only the final value is labelled)
    labels = ["naive", "-O3", "SIMD", "OpenMP", "CUDA"]
    heights = [10, 40, 85, 130, 180]
    for i, (lbl, h) in enumerate(zip(labels, heights)):
        x = 470 + i * 70
        col = SUN if i == 4 else mix(BLUE, 0.4 + 0.12 * i)
        c.rect(x, 250 - h, 44, h, fill=col, r=6)
        c.text(x + 22, 266, lbl, 15, DIM, MONO, "mm")
    c.text(470 + 4 * 70 + 22, 250 - 180 - 16, "100×", 18, SUN, SANS_B, "mm")
    c.save("matrix-multiplication")


@thumb("icecream-parlor")
def icecream():
    c = Canvas()
    x0, x1 = 230, 760
    c.text(150, 64, "threads", 15, DIM, MONO, "lm")
    random.seed(9)
    for i in range(5):
        y = 90 + i * 34
        c.text(150, y + 10, f"cust {i + 1}", 15, DIM, MONO, "lm")
        c.line(x0, y + 10, x1, y + 10, mix(LINE, 0.7), 1)
        t = x0 + random.uniform(0, 60)
        wait = random.uniform(40, 140)
        c.rect(t, y + 2, wait, 16, fill=mix(SUN, 0.25), r=4)
        c.rect(t + wait, y + 2, random.uniform(70, 140), 16, fill=mix(MINT, 0.7), r=4)
    # lock + semaphore
    lx = 520
    c.line(lx, 80, lx, 262, mix(VIOLET, 0.8), 1.5)
    c.box(lx - 44, 262, 88, 26, VIOLET, "mutex", 11, r=13, path=MONO)
    c.text(x1, 64, "machines", 15, DIM, MONO, "rm")
    for k in range(3):
        c.circle(x1 - 8 - k * 18, 82, 6, fill=MINT if k else mix(MINT, 0.25))
    c.rect(x0, 276, 14, 10, fill=mix(SUN, 0.25), r=2)
    c.text(x0 + 20, 281, "waiting", 14, DIM, MONO, "lm")
    c.rect(x0 + 100, 276, 14, 10, fill=mix(MINT, 0.7), r=2)
    c.text(x0 + 120, 281, "served", 14, DIM, MONO, "lm")
    c.save("icecream-parlor")


@thumb("xv6-part2")
def xv6():
    c = Canvas()
    # PBS run queue
    c.text(150, 70, "priority scheduler", 13, BLUE, SANS_B, "lm")
    procs = [("init", 60), ("sh", 45), ("ls", 30), ("cat", 75), ("grep", 90)]
    procs.sort(key=lambda p: p[1])
    for i, (name, pr) in enumerate(procs):
        y = 92 + i * 34
        c.text(150, y + 12, name, 13, TEXT, MONO, "lm")
        c.rect(205, y + 3, 180, 18, fill=mix(LINE, 0.6), r=5)
        col = MINT if i == 0 else mix(BLUE, 0.75)
        c.rect(205, y + 3, 180 * (1 - pr / 100) + 20, 18, fill=col, r=5)
        c.text(395, y + 12, str(pr), 15, DIM, MONO, "lm")
    c.text(205, 274, "lower value = runs first", 14, DIM, MONO, "lm")
    # copy-on-write
    c.text(520, 70, "copy-on-write fork", 13, VIOLET, SANS_B, "lm")
    c.box(520, 100, 100, 44, BLUE, "parent PT", 12, path=MONO)
    c.box(520, 196, 100, 44, BLUE, "child PT", 12, path=MONO)
    c.box(700, 140, 110, 56, MINT, None, r=10)
    c.text(755, 160, "page", 13, MINT, MONO_B, "mm")
    c.text(755, 180, "read-only", 14, DIM, MONO, "mm")
    c.arrow(622, 122, 698, 160, mix(VIOLET, 0.8), 1.4)
    c.arrow(622, 218, 698, 178, mix(VIOLET, 0.8), 1.4)
    c.text(755, 222, "copied on write", 11, SUN, MONO, "mm")
    c.save("xv6-part2")


@thumb("indcity")
def indcity():
    c = Canvas()
    answer = "DELHI"
    guesses = ["SURAT", "KOCHI", "DELHI"]

    def score(g, a):
        res = ["x"] * 5
        rest = list(a)
        for i in range(5):
            if g[i] == a[i]:
                res[i], rest[i] = "g", None
        for i in range(5):
            if res[i] == "x" and g[i] in rest:
                res[i] = "y"
                rest[rest.index(g[i])] = None
        return res
    s, gap = 40, 6
    x0 = 480 - (5 * s + 4 * gap) / 2
    for r in range(5):
        y = 46 + r * (s + gap) + 6
        g = guesses[r] if r < len(guesses) else None
        sc = score(g, answer) if g else None
        for i in range(5):
            x = x0 + i * (s + gap)
            if g:
                col = {"g": MINT, "y": SUN, "x": mix(TEXT, 0.18)}[sc[i]]
                c.rect(x, y, s, s, fill=col if sc[i] != "x" else col, r=6)
                c.text(x + s / 2, y + s / 2, g[i], 20, BG if sc[i] != "x" else TEXT, SANS_B, "mm")
            else:
                c.rect(x, y, s, s, outline=mix(TEXT, 0.15), r=6, width=1.3)
    c.text(x0 - 30, 160, "guess the\ncity", 13, DIM, MONO, "rm")
    c.pill(x0 + 5 * s + 4 * gap + 80, 160, "hint: capital", SUN, 12, 12, 26, MONO)
    c.save("indcity")


@thumb("smai-hmm")
def hmm():
    c = Canvas()
    # MFCC strip
    random.seed(5)
    cols_n, rows_n = 40, 8
    for i in range(cols_n):
        for j in range(rows_n):
            v = 0.5 + 0.5 * math.sin(i / 4 + j) * math.cos(i / 9 - j / 3)
            v = max(0.06, min(1, v * random.uniform(0.6, 1.0)))
            c.rect(150 + i * 13, 56 + j * 10, 12, 9, fill=mix(BLUE if j > 3 else VIOLET, v * 0.8), r=1)
    c.text(150, 150, "MFCC features", 15, DIM, MONO, "lm")
    # left-to-right HMM
    xs = [200 + i * 110 for i in range(5)]
    y = 214
    for i, x in enumerate(xs):
        c.d.arc(c._p(x - 14, y - 46, x + 14, y - 16), 180, 360, fill=mix(VIOLET, 0.7), width=2 * SS)
        c.circle(x, y, 22, fill=mix(VIOLET, 0.16), outline=VIOLET, width=2)
        c.text(x, y, f"s{i + 1}", 14, VIOLET, MONO_B, "mm")
        if i < 4:
            c.arrow(x + 24, y, xs[i + 1] - 26, y, mix(VIOLET, 0.8), 1.5, 6)
    # result
    c.box(730, 180, 70, 70, MINT, None, r=14)
    c.text(765, 215, "7", 34, MINT, SANS_B, "mm")
    c.text(765, 268, "argmax P(x | λₖ)", 14, DIM, MONO, "mm")
    c.save("smai-hmm")


@thumb("smai-autoencoder")
def autoencoder():
    c = Canvas()
    # pixel "shirt" input
    shirt = ["..####..", ".######.", "########", "#.####.#", "..####..", "..####..", "..####..", "..####.."]

    def pix(x, y, noise=0.0, seed=0):
        random.seed(seed)
        for j, row in enumerate(shirt):
            for i, ch in enumerate(row):
                v = (0.85 if ch == "#" else 0.06) + random.uniform(-noise, noise)
                c.rect(x + i * 12, y + j * 12, 11, 11, fill=mix(TEXT, max(0.04, min(0.95, v))), r=1.5)
    pix(140, 112)
    c.text(188, 226, "input", 15, DIM, MONO, "mm")
    # hourglass
    heights = [150, 110, 70, 34, 70, 110, 150]
    cols = [BLUE, BLUE, BLUE, SUN, VIOLET, VIOLET, VIOLET]
    for i, (h, col) in enumerate(zip(heights, cols)):
        x = 290 + i * 54
        c.rect(x, 160 - h / 2, 30, h, fill=mix(col, 0.25), outline=mix(col, 0.7), r=6, width=1.2)
        if i < 6:
            c.arrow(x + 33, 160, x + 51, 160, mix(DIM, 0.8), 1.2, 4)
    c.text(290 + 3 * 54 + 15, 196, "z", 15, SUN, MONO_B, "mm")
    c.text(370, 262, "encoder", 15, DIM, MONO, "mm")
    c.text(587, 262, "decoder", 15, DIM, MONO, "mm")
    pix(690, 112, 0.18, seed=2)
    c.text(738, 226, "reconstruction", 15, DIM, MONO, "mm")
    c.save("smai-autoencoder")


@thumb("smai-clustering")
def clustering():
    c = Canvas()
    random.seed(12)
    centres = [(250, 120, BLUE, 34, 22, -25), (360, 210, VIOLET, 40, 20, 15), (470, 110, MINT, 30, 24, 40)]
    for cx, cy, col, sx, sy, deg in centres:
        a = math.radians(deg)
        for k in (2.2, 1.5, 0.8):
            pts = [(cx + k * (sx * math.cos(t) * math.cos(a) - sy * math.sin(t) * math.sin(a)),
                    cy + k * (sx * math.cos(t) * math.sin(a) + sy * math.sin(t) * math.cos(a)))
                   for t in [i * math.pi / 30 for i in range(60)]]
            c.poly(pts, fill=None, outline=mix(col, 0.25 + 0.15 * (2.2 - k)), width=1.2)
        for _ in range(28):
            u, v = random.gauss(0, 1), random.gauss(0, 1)
            px = cx + sx * u * math.cos(a) - sy * v * math.sin(a)
            py = cy + sx * u * math.sin(a) + sy * v * math.cos(a)
            c.circle(px, py, 3.2, fill=mix(col, 0.85))
        c.line(cx - 7, cy - 7, cx + 7, cy + 7, TEXT, 2.4)
        c.line(cx - 7, cy + 7, cx + 7, cy - 7, TEXT, 2.4)
    # dendrogram
    leaves = [600 + i * 28 for i in range(8)]
    base = 250
    c.text(700, 64, "hierarchical", 15, DIM, MONO, "mm")

    def join(xa, ya, xb, yb, y, col):
        c.line(xa, ya, xa, y, col, 1.6)
        c.line(xb, yb, xb, y, col, 1.6)
        c.line(xa, y, xb, y, col, 1.6)
        return (xa + xb) / 2, y
    l = [(x, base) for x in leaves]
    a1 = join(*l[0], *l[1], 220, BLUE)
    a2 = join(*l[2], *l[3], 210, BLUE)
    b1 = join(*a1, *a2, 170, BLUE)
    a3 = join(*l[4], *l[5], 225, MINT)
    a4 = join(*l[6], *l[7], 200, MINT)
    b2 = join(*a3, *a4, 150, MINT)
    join(*b1, *b2, 90, DIM)
    for x in leaves:
        c.circle(x, base + 6, 3, fill=DIM)
    c.save("smai-clustering")


@thumb("smai-mlp")
def mlp():
    c = Canvas()
    lines = [
        ("z = W·a + b", VIOLET), ("a = σ(z)", VIOLET),
        ("δ = ∂L/∂z", SUN), ("W ← W − η·∂L/∂W", MINT),
    ]
    for i, (t, col) in enumerate(lines):
        c.text(140, 90 + i * 38, t, 20, col, MONO_B, "lm")
    c.text(140, 250, "MLP in pure NumPy", 13, DIM, MONO, "lm")
    layers = [4, 5, 5, 3]
    xs = [500, 600, 700, 800]
    pos = []
    for n, x in zip(layers, xs):
        span = 50 * (n - 1)
        pos.append([(x, 160 - span / 2 + i * 50) for i in range(n)])
    for L in range(3):
        for a in pos[L]:
            for b in pos[L + 1]:
                c.line(*a, *b, mix(VIOLET, 0.28), 1)
    cols = [BLUE, VIOLET, VIOLET, MINT]
    for L, ps in enumerate(pos):
        for x, y in ps:
            c.circle(x, y, 12, fill=mix(cols[L], 0.18), outline=cols[L], width=2.2)
    c.save("smai-mlp")


@thumb("lambda-interpreter")
def interpreter():
    c = Canvas()
    F, K, N, B, D = TEXT, VIOLET, MINT, BLUE, DIM
    lines = [
        [("(", F), ("letrec", K), (" ([", F), ("fact", B), (" (", F), ("λ", K), (" n . (", F), ("if", K),
         (" (= n ", F), ("0", N), (") ", F), ("1", N)],
        [("    (* n (", F), ("fact", B), (" (- n ", F), ("1", N), ("))))))])", F)],
        [("  (", F), ("fact", B), (" ", F), ("5", N), ("))", F), ("      ; ⇒ 120", D)],
        [],
        [("(", F), ("let*", K), (" ([i (", F), ("ref", K), (" ", F), ("0", N), (")])", F)],
        [("  (", F), ("begin", K), (" (", F), ("while", K), (" (< (", F), ("deref", K), (" i) ", F), ("5", N),
         (")", F)],
        [("           (", F), ("set", K), (" i (+ (", F), ("deref", K), (" i) ", F), ("1", N), (")))", F)],
        [("         (", F), ("deref", K), (" i)))", F), ("  ; ⇒ 5", D)],
    ]
    widest = max(sum(c.textlen(t, 17, MONO_B if col == K else MONO) for t, col in ln) for ln in lines if ln)
    c.code((W - widest) / 2, 46, lines, 17, 29)  # centred
    c.save("lambda-interpreter")


@thumb("mapcode")
def mapcode():
    c = Canvas()
    grid = ["0 1 2 3 4 5 6 7", "1 1 2 3 4 ⊥ ⊥ ⊥", "2 2 1 2 ⊥ ⊥ ⊥ ⊥", "3 3 2 ⊥ ⊥ ⊥ ⊥ ⊥",
            "4 4 ⊥ ⊥ ⊥ ⊥ ⊥ ⊥", "5 ⊥ ⊥ ⊥ ⊥ ⊥ ⊥ ⊥", "6 ⊥ ⊥ ⊥ ⊥ ⊥ ⊥ ⊥"]
    cw = ch = 33
    x0, y0 = 175, 52
    for j, ch_ in enumerate("sitting"):
        c.text(x0 + (j + 1) * cw + 14, y0 - 6, ch_, 14, BLUE, MONO_B, "mm")
    for i, row in enumerate(grid):
        if i:
            c.text(x0 - 14, y0 + 8 + i * ch + 14, "kitten"[i - 1], 14, BLUE, MONO_B, "mm")
        for j, v in enumerate(row.split()):
            X, Y = x0 + j * cw, y0 + 8 + i * ch
            f = v != "⊥"
            c.rect(X, Y, cw - 4, ch - 4, fill=mix(VIOLET, 0.2) if f else mix(TEXT, 0.04),
                   outline=mix(VIOLET, 0.45) if f else mix(TEXT, 0.1), r=5, width=1)
            c.text(X + (cw - 4) / 2, Y + (ch - 4) / 2, v, 14, MINT if f else DIM, MONO, "mm")
    sx = 520
    c.text(sx, 70, "X₅ = F⁵(ρ(kitten, sitting))", 15, TEXT, MONO_B, "lm")
    for k, (t, col) in enumerate([("ρ : I → X", VIOLET), ("F : X → X", VIOLET), ("π : X → A", VIOLET),
                                  ("σ : X → ℕ   strictly ↓", SUN)]):
        c.text(sx, 120 + k * 36, t, 17, col, MONO_B, "lm")
    c.text(sx, 270, "iterate F to a fixed point", 15, DIM, MONO, "lm")
    c.save("mapcode")


def contact_sheet(names, path):
    """Thumbnails at the card's on-screen size (476x160), two per row."""
    w, h, gap = 476, 160, 12
    rows = (len(names) + 1) // 2
    sheet = Image.new("RGB", (2 * w + 3 * gap, rows * (h + gap) + gap), (2, 8, 23))  # page bg
    for i, n in enumerate(names):
        im = Image.open(OUT / f"{n}.jpg").resize((w, h), Image.LANCZOS)
        sheet.paste(im, (gap + (i % 2) * (w + gap), gap + (i // 2) * (h + gap)))
    sheet.save(path)
    print("wrote", path)


if __name__ == "__main__":
    args = sys.argv[1:]
    sheet = None
    if "--sheet" in args:  # --sheet <out.png>: also write a contact sheet
        i = args.index("--sheet")
        sheet = args[i + 1]
        del args[i:i + 2]
    names = args or list(THUMBS)
    unknown = [n for n in names if n not in THUMBS]
    if unknown:
        sys.exit(f"unknown thumbnail(s): {', '.join(unknown)}; known: {', '.join(THUMBS)}")
    for n in names:
        THUMBS[n]()
    if sheet:
        # show the new ones next to a few existing ones for a style comparison
        refs = [n for n in ("learnai", "ocr-crnn", "mapcode", "smai-hmm") if n not in names]
        contact_sheet(names + refs[: max(0, 4 - len(names))], sheet)
