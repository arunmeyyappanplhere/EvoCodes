import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar, Tag, Search, X as XIcon } from 'lucide-react'
import Modal from './Modal.jsx'

// Replace `image` with real asset paths (e.g. /projects/mega-vii.jpg) once
// you have final artwork — placehold.co is just a stand-in so the grid
// renders correctly out of the box.
const PROJECTS = [
  {
    id: 'mega-vii',
    title: 'Revolutionizing Data Intelligence for FinTech',
    category: 'AI / FinTech',
    date: 'March 2026',
    image: 'https://placehold.co/900x600/0a0a0a/22d3ee?text=Mega+VII',
    shortDesc:
      'A real-time analysis engine processing millions of transactions per second.',
    fullDesc:
      'We built a proprietary real-time analysis engine that processes millions of transactions per second, powered by a custom-trained neural core for anomaly detection. The system ingests transaction streams from twelve regional payment rails, normalizes them through a unified event schema, and flags anomalous patterns within single-digit milliseconds of ingestion.\n\nOn the infrastructure side, we designed a horizontally-scalable pipeline built on event-sourced microservices, with a dedicated inference layer that runs the anomaly-detection core close to the data to avoid cross-region latency. The result: a 40% reduction in fraud-related false negatives and sub-100ms p99 detection latency at full production load.',
    liveUrl: 'https://example.com',
  },
  {
    id: 'lumina',
    title: 'Lumina Mobile App',
    category: 'IoT / Mobile',
    date: 'January 2026',
    image: 'https://placehold.co/900x600/0a0a0a/22d3ee?text=Lumina',
    shortDesc: 'A modern IoT ecosystem control app for connected homes.',
    fullDesc:
      'Lumina unifies dozens of disparate smart-home protocols behind one clean, gesture-driven mobile interface. We built a custom device-discovery layer that speaks Matter, Zigbee, and legacy proprietary protocols simultaneously, then normalized everything into a single reactive state graph on the client.\n\nThe result is an app that feels instantaneous even when controlling twenty-plus devices at once, with offline-first local control that falls back gracefully when the cloud bridge is unreachable.',
    liveUrl: 'https://example.com',
  },
  {
    id: 'core-network',
    title: 'Core Network v2',
    category: 'Cloud Infrastructure',
    date: 'November 2025',
    image: 'https://placehold.co/900x600/0a0a0a/22d3ee?text=Core+Network',
    shortDesc: 'A global cloud infrastructure overhaul built for elastic scale.',
    fullDesc:
      'Core Network v2 is a ground-up rebuild of a legacy monolithic backend into a globally-distributed, elastically-scaled service mesh. We re-architected the deployment topology around regional edge clusters with automated failover, cutting median global latency by 61% and enabling true zero-downtime blue-green releases across every region simultaneously.\n\nObservability was rebuilt in parallel — a unified tracing layer now gives full request-path visibility across every service boundary, which cut mean-time-to-resolution on production incidents from hours to minutes.',
    liveUrl: 'https://example.com',
  },
]

const CATEGORIES = ['All', ...new Set(PROJECTS.map((p) => p.category))]

function ProjectCard({ project, onOpen }) {

  document.title = "EVO CODES | Projects"


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(project)}
      className="cursor-pointer card-border rounded-2xl bg-charcoal overflow-hidden group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black/70 via-transparent to-transparent" />
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open ${project.title} live`}
          className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:text-cyan-400 hover:bg-black/70 transition-colors"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="p-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
          <Tag size={11} /> {project.category}
        </span>
        <h3 className="font-display font-semibold text-lg mt-3 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-gray-secondary mt-2 leading-relaxed">
          {project.shortDesc}
        </p>
        <p className="inline-flex items-center gap-1.5 text-xs text-gray-secondary mt-5 font-mono">
          <Calendar size={12} /> {project.date}
        </p>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  document.title = "EVO CODES | Projects"

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="font-display font-bold text-3xl lg:text-4xl">
          Flagship Ventures
        </h1>
        <p className="mt-3 text-gray-secondary">
          Selected works from our laboratory of digital innovations.
        </p>
      </motion.div>

      <div className="max-w-xl mx-auto mb-8 relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-secondary pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects by name, category, or description..."
          className="w-full bg-charcoal card-border rounded-full pl-11 pr-10 py-3 text-sm text-white placeholder:text-gray-secondary focus:outline-none focus:border-cyan-400/40 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-secondary hover:text-white transition-colors"
          >
            <XIcon size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-xs font-mono px-4 py-2 rounded-full border transition-colors ${
              category === cat
                ? 'bg-cyan-400 text-black border-cyan-400'
                : 'border-white/10 text-gray-secondary hover:text-white hover:border-cyan-400/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-secondary py-20">
          <p>No projects match your search.</p>
          <button
            onClick={() => {
              setQuery('')
              setCategory('All')
            }}
            className="inline-flex items-center gap-1.5 mt-4 text-cyan-400 text-sm"
          >
            <XIcon size={14} /> Clear filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActive} />
          ))}
        </div>
      )}

      <Modal open={!!active} onClose={() => setActive(null)} widthClass="max-w-4xl">
        {active && (
          <div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
              <Tag size={11} /> {active.category}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl mt-3 mb-2 leading-snug">
              {active.title}
            </h2>
            <p className="inline-flex items-center gap-1.5 text-xs text-gray-secondary font-mono mb-6">
              <Calendar size={12} /> {active.date}
            </p>
            <p className="text-gray-secondary leading-relaxed whitespace-pre-line">
              {active.fullDesc}
            </p>
            <a
              href={active.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-9 bg-cyan-400 text-black text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              View Live <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </Modal>
    </section>
  )
}