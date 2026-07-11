import { useEffect, useState } from "react";

const WORDS = [
  "AI Solutions",
  "Full Stack Development",
  "App Development",
  "UI/UX Design",
  "Mobile App Development",
  "DevOps",
  "Performance Audits",
  "Testing",
];

const TICK_MS = 45;      // how often the frame advances
const PAUSE_TICKS = 30;  // ~1.35s holding the full word
const GAP_TICKS = 6;     // ~0.27s empty gap before next word starts typing

// Precompute every single frame the animation will ever display,
// as a flat array of strings. The component just walks through it.
function buildSchedule(words) {
  const frames = [];
  words.forEach((word) => {
    // typing: "A", "AI", "AI ", "AI S" ... up to full word
    for (let i = 1; i <= word.length; i++) {
      frames.push(word.slice(0, i));
    }
    // pause on the full word
    for (let i = 0; i < PAUSE_TICKS; i++) {
      frames.push(word);
    }
    // deleting: back down to empty
    for (let i = word.length - 1; i >= 0; i--) {
      frames.push(word.slice(0, i));
    }
    // gap before next word
    for (let i = 0; i < GAP_TICKS; i++) {
      frames.push("");
    }
  });
  return frames;
}

const SCHEDULE = buildSchedule(WORDS);

export default function TypewriterWords({ className = "" }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % SCHEDULE.length);
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const text = SCHEDULE[frame];

  return (
    <span className="inline-flex items-baseline">
      <span className="sr-only">{WORDS.join(", ")}</span>
      <span aria-hidden="true" className={className}>
        {text}
        <span className="inline-block w-0.5 h-[0.9em] bg-cyan-400 ml-1 align-middle animate-pulse" />
      </span>
    </span>
  );
}