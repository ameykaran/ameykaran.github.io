---
name: portfolio-project
description: Add or update a project on the portfolio end to end - research the project, write its card entry (title, description, tech tags, links) in src/data/projects.tsx in the house writing style, and generate its thumbnail in the site's drawn style via scripts/thumbnails.py. Use whenever the user wants to add a project to the portfolio/website, list a repo or assignment as a project, rewrite a project description, or create/redo a project thumbnail. Never use photos, screenshots, stock images or AI-generated art for project cards.
---
# Portfolio projects

Each project on the portfolio is one entry in `src/data/projects.tsx`, shown
as a card: a drawn thumbnail, a title, a short description, tech chips, and
Code/Demo links. Adding a project means doing all of it, in this order:

1. **Research** the project.
2. **Write the entry**, following the house style below.
3. **Draw the thumbnail** with `scripts/thumbnails.py`.
4. **Verify and report back.** Don't commit, push or deploy.

## 1. Research

Work out what was actually built and what came out of it, from the best source
available:

- **A GitHub repo:** read the README, the reports and the main code. Use
  `gh api ...` or a shallow clone into a scratch directory. For notebooks, pull the
  markdown cells and the printed outputs. That's where the real numbers are.
- **A local folder:** read the code and any report.
- **Only the user's description:** use it, and ask for a repo or the results if
  the card would otherwise have no concrete detail.

Collect:

- the mechanism (what it does and how)
- 1–2 concrete results (accuracy, speedup, scale, users)
- the core technologies
- the repo URL and any live demo URL

Check every link loads (`curl -s -o /dev/null -L -w '%{http_code}' <url>`).
Repos are often renamed or private, and a 404 card link looks careless.

## 2. Write the entry

```tsx
{
  title: "Spoken Digit Recognition using HMMs",
  description:
    "Trained one Gaussian HMM per digit on MFCC features and classified utterances by maximum likelihood, reaching 90% test accuracy on the Free Spoken Digit Dataset.",
  technologies: ["Python", "hmmlearn", "librosa", "MFCC"],
  githubUrl: "https://github.com/ameykaran/smai-assignments/tree/main/assignments/5",
  demoUrl: "https://...",          // only if a live demo exists
  imageUrl: "./projects/smai-hmm.jpg",
},
```

(`Project` type: `src/types/index.ts`. `githubUrl`, `demoUrl` and `imageUrl` are optional.)

**Title**

- Short and plain: say what the thing is, so a recruiter skimming can follow it. Either:
  - a descriptive name: "Neural Networks from Scratch", "Optimising Matrix Multiplication"
  - or "Name - what it is": "AKonsole", "Tiny Tots - Baby Growth Tracker"
- Avoid stacking several technical terms with commas.
- Roughly 60 characters at most, so it wraps to two lines at worst.

**Description**: match the existing cards.

- **15–40 words, 1–2 sentences.** The card shows the whole thing, so long descriptions make uneven cards.
- **Lead with what was built**, either as a past-tense verb ("Built", "Trained", "Extended", "Pretrained", "Refactored") or as a noun phrase ("Interpreter for a λ-calculus…", "Multi-agent AI system with…").
- **Include 1–2 concrete specifics:** a real number ("150M-parameter", "3B tokens", "100x speedup", "90% test accuracy"), or the distinctive technique or dataset. Specifics beat adjectives, so drop "robust", "seamless", "cutting-edge" and "leveraging".
- **British spelling**, as on the rest of the site: optimised, visualised, specialised, Dockerised, vectorisation.
- **Plain characters only:** no markdown or HTML, since the description renders as plain text. Unicode is fine (λ, ρ, ×). Use "-" or "–" in titles the way the existing ones do.

**Technologies**

- 4–6 chips: the most specific tools first (PyTorch, FastAPI, CUDA), then a concept or two if it helps (RAG, OCR, Operational Semantics).
- Don't repeat what's obvious from another chip.

**Links**

- `githubUrl` should point at the most specific place: a subfolder (`/tree/main/<path>`) if the project is one part of a bigger repo.
- Add `demoUrl` only when a live demo actually exists.

**Placement**

- The page shows the first 4 entries before "Show More", so those are the featured slot.
- Add new projects next to related ones: ML near ML, systems near systems.
- Don't reshuffle the user's existing order unless asked.

**Honesty**

- Every claim and number must come from the project's README, reports, notebook outputs or the user.
- Never round up, and never invent metrics. If there is no number, describe the technique instead.

## 3. Draw the thumbnail

Every card's thumbnail is drawn in code by `scripts/thumbnails.py`. It's a
small schematic of what the project *does*, painted on the card's own
background colour so the image has no visible edge. New projects get one made
the same way, so the grid stays consistent.

1. **Pick a motif:** the one idea that best explains the project. See "Choosing a motif" below.
2. **Add a function** to `scripts/thumbnails.py`, next to the others, above the
   `contact_sheet` helper:

   ```python
   @thumb("my-project")          # output: public/projects/my-project.jpg
   def my_project():
       c = Canvas()
       ...                       # draw with the Canvas helpers below
       c.save("my-project")      # same name as in @thumb
   ```

   Name = kebab-case slug of the project, matching the image filename.
3. **Render and preview** next to existing thumbnails at on-screen size:

   ```bash
   python3 scripts/thumbnails.py my-project --sheet <scratch-dir>/sheet.png
   ```

   Then look at both the full-size `public/projects/my-project.jpg` and the
   sheet with the Read tool. Fix and re-run until it passes the checklist below.
4. **Wire it up**: set `imageUrl: "./projects/my-project.jpg"` on the entry.

### Thumbnail style (fixed — do not change per project)

All of this is already encoded in `scripts/thumbnails.py`; use its constants
and helpers rather than raw values.

- **Canvas**: 960×320 (3:1). The card's image box is 476×160, so this is 2× for
  retina. `Canvas` draws at a further 2× and downsamples for smooth lines; always
  use logical 960×320 coordinates.
- **Background**: `BG = (12, 18, 32)`, the measured colour of `.glass-card` over
  the page. Never draw a frame, border, or filled background panel around the
  whole image.
- **Palette**: the site accent tokens `BLUE`, `VIOLET`, `MINT`, `SUN` (+ `RED`
  sparingly for "bad/down/error"), `TEXT` for primary text, `DIM` for captions,
  `LINE` for gridlines. Make tinted fills with `mix(colour, t)` (t ≈ 0.10–0.25
  for fills, 0.5–0.7 for outlines). Use 2–3 accents per thumbnail, not all of
  them.
- **Fonts**: `MONO` / `MONO_B` (JetBrains Mono) for code, captions and
  technical labels; `SANS` / `SANS_B` (Noto Sans) for headings and words in
  boxes; `DEVA` for Devanagari.
- **Safe zone**: on phones the card crops the sides, so keep all meaningful
  content within **x 130–830**. The full height (y 0–320) is visible, but
  leave ~30px of breathing room top and bottom.
- **Text sizes** (logical px; the card shows them at half size):
  captions 14–15 `DIM`, labels in shapes 12–14, headline numbers 18–34. Nothing
  below 12, or it becomes unreadable on the card.
- **Composition**: one horizontal flow or one or two side-by-side panels,
  vertically centred. Small `DIM` captions under each panel name what it is
  ("CNN encoder", "RNN decoder"). Flow arrows use `c.arrow(..., DIM)`.
- **Density**: sparse. A thumbnail should read as one idea at a glance.
  Plenty of empty `BG` is good: it is what makes the image melt into the card.

### Canvas helpers

| Call                                            | Draws                                                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `c.text(x, y, s, size, fill, path, anchor)`   | text; anchors like`"mm"` (centre), `"lm"` (left-middle), `"rm"`                                  |
| `c.textlen(s, size, path)`                    | width of text in logical px (for layout/centering)                                                     |
| `c.line(x1, y1, x2, y2, fill, width)`         | line                                                                                                   |
| `c.arrow(x1, y1, x2, y2, fill, width, head)`  | line with arrowhead at (x2, y2)                                                                        |
| `c.rect(x, y, w, h, fill, outline, r, width)` | rounded rectangle                                                                                      |
| `c.circle(cx, cy, r, fill, outline, width)`   | circle                                                                                                 |
| `c.poly(points, fill, outline, width)`        | polygon (rotated boxes, cards, ellipses)                                                               |
| `c.box(x, y, w, h, colour, label, size)`      | tinted node with centred label                                                                         |
| `c.pill(cx, cy, label, colour, size)`         | rounded tag; returns its width                                                                         |
| `c.code(x, y, lines, size, lh)`               | syntax-coloured code;`lines` = `[[(text, colour), ...], ...]`, `VIOLET` pieces are bold keywords |
| `c.save(name)`                                | writes`public/projects/<name>.jpg`                                                                   |

Use `random.seed(n)` before any randomness so re-running gives identical images.

### Choosing a motif

Draw the mechanism, not a logo. Good patterns from the existing thumbnails:

- **Pipeline** (input → transform → output): OCR (word image → CNN grid → RNN
  cells → letters), LearnAI (documents → chunks → agents), ViT (patches →
  tokens → caption).
- **The core data structure mid-computation**: mapcode's half-filled DP table,
  xv6's run queue plus copy-on-write page tables, IndCity's Wordle grid.
- **A characteristic plot**: candlesticks (Stonks), growth percentiles (Tiny
  Tots), speedup bars (matrix multiplication), clusters with GMM ellipses.
- **Code or a terminal** for language/systems projects: the interpreter's
  highlighted s-expressions, AKonsole's shell session.
- **Architecture diagram**: MLP layers, autoencoder hourglass, UML refactor.

Prefer 1–3 panels; give each a `DIM` caption.

### Thumbnail honesty

- Any number that reads as a **result** (accuracy, speedup, dataset size,
  parameter count) must come from the project's description, README or
  outputs. If you don't know a value, draw the shape without a number.
- Illustrative mock-UI values (an example XP bar, a sample PID, a sample
  caption) are fine, but mention them to the user when you report back so they
  can swap in real ones.

## 4. Verify and report back

- Run `pnpm run build` (delete `dist/` afterwards).
- If a dev server is practical (`pnpm exec vite --port <port>`), check the new card at desktop (~1280px) and phone (~390px) widths: description length next to its neighbour, title wrapping, thumbnail cropping, links. Stop the server afterwards.
- **Do not commit, push, or deploy.** Show the user the entry and the thumbnail, and wait for their go-ahead. When they approve, check `git status`/`git diff --cached` first and commit only the files you changed. They often have their own work staged.

When reporting, list:

- the entry's text
- where you put it in the list
- the source of each number
- any illustrative values in the thumbnail
- whether they want it added to the resume

## Checklist before reporting back

**Entry**

- [ ] Description 15–40 words, leads with what was built, has a concrete specific, British spelling
- [ ] Every number traceable to a source; nothing rounded up or invented
- [ ] Title short and plain; 4–6 tech chips
- [ ] All links return 200; `githubUrl` as specific as possible

**Thumbnail**

- [ ] Background is plain `BG`; no frame or panel around the whole image
- [ ] Nothing meaningful outside x 130–830
- [ ] No text below size 12; no text overflowing its box (check the full-size jpg)
- [ ] Non-Latin text renders with correct shaping (Devanagari needs Pillow's
  `raqm`: `python3 -c "from PIL import features; print(features.check('raqm'))"`)
- [ ] Looks like it belongs in the contact sheet next to the existing ones
- [ ] `imageUrl` points at the generated file

**Wrap-up**

- [ ] `pnpm run build` passes
- [ ] Nothing committed; resume offered, not done unasked
