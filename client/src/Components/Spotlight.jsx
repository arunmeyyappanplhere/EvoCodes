import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// The two boxes below the featured case study point out to the Blogs page —
// one pre-filtered to the "Research" category, one to the unfiltered feed.
// Swap `title` / `subtitle` for whatever your actual latest posts are, or
// wire this up to pull the newest entry from BLOGS in Blogs.jsx dynamically.
const spotlightLinks = [
  {
    label: 'Latest Research',
    title: 'Why Edge Inference Is Eating Cloud AI',
    subtitle: 'Field Notes & Research',
    to: '/blogs?category=Research',
  },
  {
    label: 'Latest Blog',
    title: 'Zero-Downtime Migrations at Production Scale',
    subtitle: 'From the Engineering Team',
    to: '/blogs',
  },
]

export default function Spotlight() {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="font-display font-bold text-3xl lg:text-4xl">
          Flagship Ventures
        </h2>
        <p className="mt-3 text-gray-secondary">
          Selected works from our laboratory of digital innovations.
        </p>
      </motion.div>

      {/* Featured project */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        whileHover={{ borderColor: 'rgba(34,211,238,0.45)' }}
        className="relative overflow-hidden card-border rounded-3xl bg-gradient-to-br from-charcoal to-rich-black p-8 lg:p-14 mb-6"
      >
        <div className="absolute -right-24 -top-24 w-72 h-72 bg-cyan-400/15 rounded-full blur-[100px]" />
        <div className="relative max-w-xl">
          <span className="inline-block text-[11px] font-mono px-3 py-1 rounded-full border border-cyan-400/25 text-cyan-400 mb-6">
            CASE STUDY: MEGA VII
          </span>
          <h3 className="font-display font-bold text-2xl lg:text-3xl leading-snug mb-4">
            Revolutionizing Data Intelligence for FinTech
          </h3>
          <p className="text-gray-secondary text-sm leading-relaxed mb-8">
            We built a proprietary real-time analysis engine that processes
            millions of transactions per second, powered by a
            custom-trained neural core for anomaly detection.
          </p>
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-cyan-400 text-black text-sm font-semibold px-5 py-2.5 rounded-full"
              >
                Explore Project <ArrowRight size={15} />
              </Link>
            </motion.div>
            <span className="text-xs font-mono text-gray-secondary">
              01 — AI Financial Engine
            </span>
          </div>
        </div>
      </motion.div>

      {/* Research + Blog spotlight boxes */}
      <div className="grid md:grid-cols-2 gap-6">
        {spotlightLinks.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
          >
            <Link
              to={item.to}
              className="relative overflow-hidden card-border rounded-2xl bg-charcoal h-56 flex items-end p-7 group cursor-pointer block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-cyan-400/5" />
              <div className="relative">
                <span className="inline-block text-[11px] font-mono px-3 py-1 rounded-full border border-cyan-400/25 text-cyan-400 mb-3">
                  {item.label}
                </span>
                <h4 className="font-display font-semibold text-lg">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-secondary mt-1">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
