import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Tag, User, Search, X as XIcon } from 'lucide-react'
import Modal from './Modal.jsx'

// Replace `image` with real asset paths once you have final artwork —
// placehold.co is just a stand-in so the grid renders correctly out of the box.
const BLOGS = [
  {
    id: 'edge-inference',
    title: 'Why Edge Inference Is Eating Cloud AI',
    author: 'Arun Prakash',
    category: 'Research',
    date: 'June 2026',
    image: 'https://placehold.co/900x600/0a0a0a/22d3ee?text=Edge+Inference',
    shortDesc:
      'A look at why more teams are pushing inference workloads to the edge instead of centralizing them in the cloud.',
    content:
      "Cloud-centric inference made sense when models were too large to run anywhere else. That constraint is loosening fast. Quantized and distilled models now run comfortably on commodity edge hardware, and the latency savings compound quickly once you're serving real-time interactions.\n\nWe've started defaulting new client architectures to a hybrid model: heavy training and fine-tuning stays centralized, but inference for latency-sensitive paths moves to regional edge nodes or on-device. The cost curve favors this too — egress and round-trip compute costs on high-traffic inference paths often outweigh the operational overhead of distributing the serving layer.\n\nThe teams who get this right treat model deployment as a logistics problem, not just an ML problem.",
  },
  {
    id: 'design-systems-scale',
    title: 'Design Systems That Survive Contact With Product',
    author: 'Priya Menon',
    category: 'Design',
    date: 'May 2026',
    image: 'https://placehold.co/900x600/0a0a0a/22d3ee?text=Design+Systems',
    shortDesc:
      'Most design systems rot within a year. Here is what keeps them alive past the first big product pivot.',
    content:
      'A design system that only survives in a Figma file isn\u2019t a system, it\u2019s documentation. The systems that actually hold up under real product pressure share one trait: the components are enforced in code, not just described in a style guide.\n\nWe build token layers first — color, spacing, typography as data, not hardcoded values — so that a rebrand or theme shift is a config change, not a re-implementation. Component APIs get versioned deliberately, with deprecation windows, the same way you\u2019d version a public API.\n\nThe unglamorous part is governance: someone has to own the system and say no to one-off overrides. Systems that skip that step degrade fast.',
  },
  {
    id: 'zero-downtime-migrations',
    title: 'Zero-Downtime Migrations at Production Scale',
    author: 'Karthik Iyer',
    category: 'Engineering',
    date: 'April 2026',
    image: 'https://placehold.co/900x600/0a0a0a/22d3ee?text=Migrations',
    shortDesc:
      'The playbook we use for shipping schema and infra migrations without a single second of downtime.',
    content:
      "Every zero-downtime migration we've run successfully follows the same shape: expand, migrate, contract. You add the new structure alongside the old one, backfill and dual-write, verify parity, then only remove the old path once the new one has proven itself under real production load.\n\nThe step teams skip is the parity check. It's tempting to cut over as soon as the new path looks functional, but the migrations that go wrong are almost always the ones where nobody diffed old-path and new-path outputs against live traffic before flipping the switch.\n\nRollback plans need to be as rehearsed as the migration itself — if you can't undo a step in under five minutes, it's not a safe step.",
  },
]

const CATEGORIES = ['All', ...new Set(BLOGS.map((b) => b.category))]

function BlogCard({ blog, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(blog)}
      className="cursor-pointer card-border rounded-2xl bg-charcoal overflow-hidden group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black/70 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
          <Tag size={11} /> {blog.category}
        </span>
        <h3 className="font-display font-semibold text-lg mt-3 leading-snug">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-secondary mt-2 leading-relaxed">
          {blog.shortDesc}
        </p>
        <div className="flex items-center justify-between mt-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-secondary font-mono">
            <User size={12} /> {blog.author}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-secondary font-mono">
            <Calendar size={12} /> {blog.date}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Blogs() {
  const [active, setActive] = useState(null)
  const [query, setQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  // Supports being linked to as /blogs?category=Research from the home
  // page's "Latest Research" spotlight box, while still working as a plain
  // /blogs link for "Latest Blog".

  document.title = "EVO CODES | Blogs"

  const activeCategory = searchParams.get('category') || 'All'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BLOGS.filter((b) => {
      const matchesCategory =
        activeCategory === 'All' || b.category.toLowerCase() === activeCategory.toLowerCase()
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.shortDesc.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const setCategory = (cat) => {
    if (cat === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="font-display font-bold text-3xl lg:text-4xl">
          Field Notes & Research
        </h1>
        <p className="mt-3 text-gray-secondary">
          Writing from the team on what we're building, breaking, and learning.
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
          placeholder="Search posts by title, author, or category..."
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
              activeCategory.toLowerCase() === cat.toLowerCase() ||
              (cat === 'All' && !searchParams.get('category'))
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
          <p>No posts match your search.</p>
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
          {filtered.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onOpen={setActive} />
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
            <h2 className="font-display font-bold text-2xl sm:text-3xl mt-3 mb-3 leading-snug">
              {active.title}
            </h2>
            <div className="flex items-center gap-5 mb-7">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-secondary font-mono">
                <User size={12} /> {active.author}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-secondary font-mono">
                <Calendar size={12} /> {active.date}
              </span>
            </div>
            <p className="text-gray-secondary leading-relaxed whitespace-pre-line">
              {active.content}
            </p>
          </div>
        )}
      </Modal>
    </section>
  )
}