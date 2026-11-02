import React from "react";
import { NAME_GLYPHS, NAME_VIEWBOX } from "@/data/nameGlyphs";

interface DrawnNameProps {
  /** Accessible name; must match the letters in nameGlyphs.ts. */
  text: string;
  className?: string;
}

/**
 * Timings in ms. Everything finishes by
 * REST_START + (letters - 2) * STAGGER + REST_DURATION = 530 + 7*45 + 600 ≈ 1.45 s.
 */
const START = 150; // begins while the hero card is still fading up
const A_DURATION = 650;
const REST_START = START + 380; // rest of the name starts once the A is mostly traced
const REST_DURATION = 600;
const STAGGER = 45;

/**
 * The hero name drawn with a pen: the stroke starts at the apex of the "A",
 * traces its outline, then the remaining letters are inked one after another.
 * Each letter fills in once its outline is complete, and the pen line fades so
 * the final result looks exactly like the plain text.
 *
 * Glyph outlines come from scripts/name_glyphs.py (1000 units = 1em), so the
 * SVG is sized in em and scales with the heading's font-size.
 * Reduced motion: the CSS in index.css disables the animation (static name).
 */
const DrawnName: React.FC<DrawnNameProps> = ({ text, className }) => {
  const [, , w, h] = NAME_VIEWBOX;
  return (
    <h1 className={className}>
      <span className="sr-only">{text}</span>
      <svg
        aria-hidden="true"
        className="drawn-name block overflow-visible"
        viewBox={NAME_VIEWBOX.join(" ")}
        style={{ width: `${w / 1000}em`, height: `${h / 1000}em` }}
      >
        {NAME_GLYPHS.map((g, i) => (
          <path
            key={i}
            d={g.d}
            pathLength={1}
            style={{
              animationDuration: `${i === 0 ? A_DURATION : REST_DURATION}ms`,
              animationDelay: `${i === 0 ? START : REST_START + (i - 1) * STAGGER}ms`,
            }}
          />
        ))}
      </svg>
    </h1>
  );
};

export default DrawnName;
