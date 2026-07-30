import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { chipStyle, textStyle } from '../utils/color.js'

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!service) return null
  const Icon = service.icon

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_60px_rgba(34,211,238,0.12)] p-8"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute hover:cursor-pointer top-5 right-5 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Icon -- themed via inline style from color.js (handles hex + Tailwind) */}
          <div
            className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 overflow-hidden"
            style={chipStyle(service.color)}
          >
            {service.iconUrl ? (
              <img src={service.iconUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              Icon && <Icon size={26} />
            )}
          </div>

          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400">
            {service.head}
          </span>

          {/* Title -- themed text color */}
          <h3
            className="font-display font-bold text-2xl mt-2 mb-4"
            style={textStyle(service.color)}
          >
            {service.title}
          </h3>

          <p className="text-sm text-gray-secondary leading-relaxed mb-7">
            {service.desc}
          </p>

          {service.stack.length > 0 && (
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.15em] block mb-3 text-gray-secondary">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-1.5 rounded-full border"
                    style={chipStyle(service.color)}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
