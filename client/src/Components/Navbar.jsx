import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Pricing', to: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu automatically whenever the viewport is resized
  // back up to desktop width, so it doesn't stay open in a stale state.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `relative transition-colors hover:text-white ${isActive ? 'text-cyan-400' : ''}`

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
        <NavLink to="/" className="font-display font-bold text-xl tracking-tight text-gradient">
          Evo Codes
        </NavLink>

        <ul className="hidden md:flex items-center gap-9 font-body text-sm text-gray-secondary">
          {links.map(({ label, to }) => (
            <li key={label}>
              <NavLink to={to} end={to === '/'} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(34,211,238,0.5)' }} whileTap={{ scale: 0.97 }} className="hidden md:inline-block">
          <NavLink
            to="/contact"
            className="bg-cyan-400 text-black text-sm font-semibold px-5 py-2.5 rounded-full inline-block"
          >
            Start Project
          </NavLink>
        </motion.div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-rich-black border-t border-cyan-400/10 px-6 py-6 flex flex-col gap-5 overflow-hidden"
          >
            {links.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm ${isActive ? 'text-cyan-400' : 'text-gray-secondary hover:text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="bg-cyan-400 text-black text-center text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Start Project
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}