import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar, Tag, Search, X as XIcon } from 'lucide-react'
import Modal from './Modal.jsx'
import { useFetch } from '../hooks/useFetch.js'

// Your project model stores `projectSectors` as an array (a project can span
// multiple sectors), not a single `category` string like the old mock data
// did. Everything below -- the category filter chips, the search, and the
// card badge -- was adapted to work off that array instead of a single value.

const PLACEHOLDER_IMAGE = 'https://placehold.co/900x600/0a0a0a/22d3ee?text=Project'

function formatDate(value) {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// Maps a raw Mongo project doc -> the shape the UI below renders.
function transformProject(doc) {
  const sectors = Array.isArray(doc.projectSectors) ? doc.projectSectors : []
  const desc = doc.projectDesc || ''

  return {
    id: doc.projectID || doc._id,
    title: doc.projectName || 'Untitled Project',
    sectors,
    // Card badge just needs something short to display; full list still
    // used for filtering/search.
    categoryLabel: sectors[0] || 'General',
    date: formatDate(doc.createdAt),
    image: doc.projectCoverImg || PLACEHOLDER_IMAGE,
    shortDesc: desc.length > 140 ? `${desc.slice(0, 140).trim()}…` : desc,
    fullDesc: desc,
    liveUrl: doc.projectSiteLink || null,
  }
}

function ProjectCard({ project, onOpen }) {
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
        {project.liveUrl && (
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
        )}
      </div>

      <div className="p-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
          <Tag size={11} /> {project.categoryLabel}
        </span>
        <h3 className="font-display font-semibold text-lg mt-3 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-gray-secondary mt-2 leading-relaxed">
          {project.shortDesc}
        </p>
        {project.date && (
          <p className="inline-flex items-center gap-1.5 text-xs text-gray-secondary mt-5 font-mono">
            <Calendar size={12} /> {project.date}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  document.title = "EVO CODES | Projects"

  const { data: projects, loading, error } = useFetch('/projects', {
    transform: transformProject,
  })

  const categories = useMemo(() => {
    const all = new Set()
    projects.forEach((p) => p.sectors.forEach((s) => all.add(s)))
    return ['All', ...all]
  }, [projects])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesCategory = category === 'All' || p.sectors.includes(category)
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.sectors.some((s) => s.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [projects, query, category])

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
        {categories.map((cat) => (
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

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card-border rounded-2xl bg-charcoal overflow-hidden animate-pulse"
            >
              <div className="h-52 bg-white/5" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-5 w-3/4 bg-white/5 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-2/3 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-gray-secondary py-20">
          <p>Couldn't load projects right now. Please try again shortly.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-secondary py-20">
          <p>
            {projects.length === 0
              ? 'No projects to show yet.'
              : 'No projects match your search.'}
          </p>
          {projects.length > 0 && (
            <button
              onClick={() => {
                setQuery('')
                setCategory('All')
              }}
              className="inline-flex items-center gap-1.5 mt-4 text-cyan-400 text-sm"
            >
              <XIcon size={14} /> Clear filters
            </button>
          )}
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
            <div className="flex flex-wrap gap-2">
              {(active.sectors.length ? active.sectors : [active.categoryLabel]).map(
                (s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400"
                  >
                    <Tag size={11} /> {s}
                  </span>
                )
              )}
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl mt-3 mb-2 leading-snug">
              {active.title}
            </h2>
            {active.date && (
              <p className="inline-flex items-center gap-1.5 text-xs text-gray-secondary font-mono mb-6">
                <Calendar size={12} /> {active.date}
              </p>
            )}
            <p className="text-gray-secondary leading-relaxed whitespace-pre-line">
              {active.fullDesc}
            </p>
            {active.liveUrl && (
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-9 bg-cyan-400 text-black text-sm font-semibold px-5 py-2.5 rounded-full"
              >
                View Live <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}