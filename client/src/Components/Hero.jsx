import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import NeuralCore from './NeuralCore.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 lg:pt-48 lg:pb-36">
      {/* ambient grid + glow backdrop */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-400 text-xs font-mono tracking-wide mb-6"
          >
            <Sparkles size={13} />
            THE FUTURE OF CODE
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight"
          >
            Building Intelligent
            <br />
            <span className="text-gradient">Digital Experiences</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 font-display text-lg text-white/90"
          >
            Architecting <span className="text-cyan-400">AI Solutions</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-4 text-gray-secondary text-base leading-relaxed max-w-md"
          >
            We merge high-end engineering with artificial intelligence to
            deliver software that doesn't just function—it evolves.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(34,211,238,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-cyan-400 text-black font-semibold text-sm px-6 py-3 rounded-full"
            >
              Explore Labs <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#process"
              whileHover={{ scale: 1.03, borderColor: 'rgba(34,211,238,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-white/15 text-white text-sm font-medium px-6 py-3 rounded-full"
            >
              Our Process
            </motion.a>
          </motion.div>
        </div>

        {/* Right: interactive 3D neural core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative h-[380px] sm:h-[440px] lg:h-[520px]"
        >
          <NeuralCore />
        </motion.div>
      </div>
    </section>
  )
}
