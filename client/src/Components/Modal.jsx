import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

/**
 * Shared large detail modal — same glassmorphic treatment as ServiceModal
 * (bg-white/5 backdrop-blur-2xl border border-white/10), so Projects and
 * Blogs open their "read more" view through one consistent component
 * instead of two near-duplicate modals.
 *
 * Usage: <Modal open={!!active} onClose={() => setActive(null)}>{...}</Modal>
 */
export default function Modal({ open, onClose, widthClass = 'max-w-3xl', children }) {
  // Escape-to-close + body scroll lock, matching ServiceModal's UX.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-8 sm:py-10 overflow-y-auto"
          onClick={onClose}
        >
          <div className="fixed inset-0 bg-rich-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${widthClass} rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-7 sm:p-10 my-auto`}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 text-gray-secondary hover:text-white transition-colors"
            >
              <X size={22} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
