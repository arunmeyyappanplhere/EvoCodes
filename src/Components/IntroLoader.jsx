import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/evo-codes-logo.jpeg'

const BRAND = 'EVO CODES'

/**
 * Full-screen opening sequence, mounted once at the top of <App> and
 * unmounted (via AnimatePresence in App.jsx) once loading completes.
 * Runs on every hard reload / first visit — since it's driven by component
 * mount state rather than sessionStorage, it naturally does NOT replay on
 * in-app route navigation (React Router swaps routes without remounting App).
 */
export default function IntroLoader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Lock scroll while the intro plays so the page can't shift underneath it.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const duration = 2200
    const start = performance.now()
    let raf

    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / duration) * 100)
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        // brief hold at 100% before handing off to the exit animation
        setTimeout(onDone, 450)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
    }
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] bg-rich-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Sonar rings pulsing outward from behind the logo */}
      {[0, 0.6, 1.2].map((delay) => (
        <motion.span
          key={delay}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeOut' }}
          className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-cyan-400/40"
        />
      ))}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden mb-8"
        style={{ boxShadow: '0 0 60px rgba(34,211,238,0.35)' }}
      >
        <img src={logo} alt="Evo Codes" className="w-full h-full object-cover" />
      </motion.div>

      {/* Brand name, letter-by-letter reveal */}
      <div className="flex mb-9 overflow-hidden" aria-label={BRAND}>
        {BRAND.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.045, duration: 0.5, ease: 'easeOut' }}
            className="font-display font-bold text-xl sm:text-2xl tracking-[0.35em] text-gradient"
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400 transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-[11px] font-mono text-gray-secondary tracking-widest">
        {Math.floor(progress)}%
      </p>
    </motion.div>
  )
}
