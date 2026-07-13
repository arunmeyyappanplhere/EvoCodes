import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const STEPS = [
  {
    id: "01",
    title: "Client Discussion & Planning",
    desc: "Deep-dive discovery calls to align on goals, scope, and technical constraints before a single line of code is written.",
  },
  {
    id: "02",
    title: "Designing",
    desc: "Wireframes and information architecture that map the full user journey, validated with stakeholders early.",
  },
  {
    id: "03",
    title: "UI / UX",
    desc: "High-fidelity interface design with a cohesive visual system, motion language, and accessibility built in from the start.",
  },
  {
    id: "04",
    title: "Frontend Development",
    desc: "Pixel-accurate, performant interfaces built with modern component architecture and smooth interaction states.",
  },
  {
    id: "05",
    title: "Backend Development",
    desc: "Scalable APIs, data models, and infrastructure engineered for reliability under real production load.",
  },
  {
    id: "06",
    title: "Testing",
    desc: "Automated and manual QA across devices and edge cases, catching regressions before they ever reach users.",
  },
  {
    id: "07",
    title: "Deployment",
    desc: "Zero-downtime, blue-green releases with monitoring and rollback plans in place from day one.",
  },
  {
    id: "08",
    title: "Maintenance",
    desc: "Ongoing optimization, security patching, and feature iteration guided by real usage data.",
  },
];

function StepCard({ step, index, total, progress }) {
  const start = index / total;
  const end = (index + 0.7) / total;

  const borderColor = useTransform(
    progress,
    [start, end],
    ["rgba(255,255,255,0.15)", "rgba(34,211,238,0.9)"]
  );
  const glow = useTransform(progress, [start, end], [0, 1]);
  const boxShadow = useTransform(
    glow,
    (v) => `0 0 ${v * 22}px rgba(34,211,238,${v * 0.55})`
  );
  const textColor = useTransform(
    progress,
    [start, end],
    ["rgba(255,255,255,0.5)", "rgba(34,211,238,1)"]
  );

  return (
    <div className="w-[280px] sm:w-[360px] lg:w-[400px] shrink-0">
      <motion.div
        style={{ borderColor, boxShadow }}
        className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono text-base mb-7 bg-rich-black"
      >
        <motion.span style={{ color: textColor }}>{step.id}</motion.span>
      </motion.div>
      <h3 className="font-display font-bold text-2xl mb-3">{step.title}</h3>
      <p className="text-base text-gray-secondary leading-relaxed pr-6">{step.desc}</p>
    </div>
  );
}

export default function DevWorkflow() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const total = STEPS.length;

  // Store maxScroll in a ref so the scroll listener always reads the latest
  // value without needing to be torn down and re-registered after each measure.
  const maxScrollRef = useRef(0);

  const [sectionH, setSectionH] = useState("100vh");
  const [ready, setReady] = useState(false);

  // ─── Motion values ────────────────────────────────────────────────────────
  // xMV       → translateX on the cards row (0 → -maxScroll px)
  // progressMV → 0–1 progress used by StepCard glows and the progress line
  const xMV = useMotionValue(0);
  const progressMV = useMotionValue(0);

  useLayoutEffect(() => {
    // ── scroll handler ────────────────────────────────────────────────────
    // Reads window.scrollY + section's live bounding rect to compute how far
    // the user has scrolled "into" the section, then updates both motion values.
    //
    // getBoundingClientRect().top is negative once we've scrolled past the
    // section's top edge.  We clamp to [0, 1] so nothing breaks before or
    // after the section.
    function onScroll() {
      if (!sectionRef.current || maxScrollRef.current <= 0) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // How many px we have scrolled past the section's top edge
      const scrolledIn = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolledIn / maxScrollRef.current);
      xMV.set(-progress * maxScrollRef.current);
      progressMV.set(progress);
    }

    // ── measure ───────────────────────────────────────────────────────────
    // Computes how many px the cards row overflows the viewport (the "extra"
    // vertical height we add to the section so the page has room to scroll
    // while the pinned panel tracks it horizontally).
    function measure() {
      if (!rowRef.current) return;
      const overflow = Math.max(rowRef.current.scrollWidth - window.innerWidth, 0);
      maxScrollRef.current = overflow;
      // Section height = one full viewport (the sticky panel) + overflow budget
      setSectionH(`calc(100vh + ${overflow}px)`);
      setReady(true);
      // Re-run the scroll handler immediately after measuring so the
      // translation is correct if the user is already mid-section on resize.
      onScroll();
    }

    // Measure once on mount, then again after fonts resolve (font-swap shifts
    // text widths and therefore card widths / scrollWidth).
    measure();
    document.fonts?.ready.then(measure);

    // Re-measure whenever the row resizes (viewport resize, orientation change)
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    window.addEventListener("resize", measure);

    // The scroll listener covers ALL scroll input methods:
    //   • mouse-wheel over page          ✓
    //   • browser scrollbar drag         ✓
    //   • trackpad swipe                 ✓
    //   • keyboard (PageDown / arrows)   ✓
    //   • programmatic scrollTo          ✓
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // xMV / progressMV are stable refs — no dep needed.

  return (
    /*
      Outer section — intentionally TALL.
      Height = 100vh + maxScroll gives the page the vertical scroll room
      needed so the inner sticky panel stays pinned for exactly as long as it
      takes to reveal all 8 cards.  After that the section bottom exits the
      viewport, the sticky panel unpins, and normal vertical flow resumes.
    */
    <section
      id="process"
      ref={sectionRef}
      style={{ height: sectionH, opacity: ready ? 1 : 0 }}
      className="relative bg-rich-black transition-opacity duration-300"
    >
      {/*
        Inner sticky panel — 100vh tall, sticks to the top of the viewport
        while the outer section's extra height scrolls past behind it.
        overflow-hidden clips the cards row so nothing bleeds outside.
      */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 px-6"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            The Engineering Workflow
          </h2>
          <p className="mt-3 text-gray-secondary">
            A precision-guided path from concept to market dominance.
          </p>
        </motion.div>

        {/* Cards row — translated left as the user scrolls down */}
        <div className="relative">
          <motion.div
            ref={rowRef}
            style={{ x: xMV }}
            className="flex gap-16 px-10 lg:px-24 w-max relative"
          >
            {/* Background connector line */}
            <div className="absolute top-8 left-10 right-10 h-px bg-white/10" />

            {/* Animated cyan progress line driven by scroll progress */}
            <motion.div
              style={{ scaleX: progressMV }}
              className="absolute top-8 left-10 right-10 h-px bg-cyan-400 origin-left"
            />

            {STEPS.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                total={total}
                progress={progressMV}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <p className="text-center text-xs text-gray-secondary mt-14 tracking-wide">
          Scroll to explore →
        </p>
      </div>
    </section>
  );
}
