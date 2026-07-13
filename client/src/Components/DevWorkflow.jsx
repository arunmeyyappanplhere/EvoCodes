import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

  const [maxScroll, setMaxScroll] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [ready, setReady] = useState(false); // gate rendering until measured once

  useLayoutEffect(() => {
    function measure() {
      if (!rowRef.current) return;
      const rowWidth = rowRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(rowWidth - viewportWidth, 0);
      setMaxScroll(distance);
      setSectionHeight(`${window.innerHeight + distance}px`);
      setReady(true);
    }

    // Measure immediately (covers the common case)...
    measure();

    // ...then re-measure once web fonts finish loading, since a font
    // swap after initial layout can change scrollWidth and silently
    // shrink the pinned scroll distance if we only measured once.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    // Also watch the row itself for any further layout/size changes.
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ height: sectionHeight, opacity: ready ? 1 : 0 }}
      className="relative bg-rich-black transition-opacity duration-200"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
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

        <div className="relative">
          <motion.div
            ref={rowRef}
            style={{ x }}
            className="flex gap-16 px-10 lg:px-24 w-max relative"
          >
            <div className="absolute top-8 left-10 right-10 h-px bg-white/10" />
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute top-8 left-10 right-10 h-px bg-cyan-400 origin-left"
            />

            {STEPS.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        <p className="text-center text-xs text-gray-secondary mt-14 tracking-wide">
          Scroll to explore →
        </p>
      </div>
    </section>
  );
}
