import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = ['Home', 'About', 'Services', 'Projects', 'Pricing']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-rich-black/80 backdrop-blur-md border-b border-cyan-400/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
        <span className="font-display font-bold text-xl tracking-tight text-gradient">
          Evo Codes
        </span>

        <ul className="hidden md:flex items-center gap-9 font-body text-sm text-gray-secondary">
          {links.map((link, i) => (
            <li key={link}>
              <a
                href="#"
                className={`relative transition-colors hover:text-white ${
                  i === 0 ? 'text-cyan-400' : ''
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(34,211,238,0.5)' }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:inline-block bg-cyan-400 text-black text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          Start Project
        </motion.a>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-rich-black border-t border-cyan-400/10 px-6 py-6 flex flex-col gap-5"
        >
          {links.map((link) => (
            <a key={link} href="#" className="text-gray-secondary hover:text-white text-sm">
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-cyan-400 text-black text-center text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Start Project
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
