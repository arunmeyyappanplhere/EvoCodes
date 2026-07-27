import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Tag, User, Search, X as XIcon } from 'lucide-react'
import Modal from './Modal.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { transformBlog } from '../utils/transformers.js'
import { LoadingState, ErrorState, EmptyState } from './DataState.jsx'

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

  document.title = 'EVO CODES | Blogs'

  const transform = useCallback(
    (b) => transformBlog(b),
    []
  )
  const { data: allBlogs, loading, error, refetch } = useFetch('/blogs', { transform })

  // Only show posts the admin has published on the public site.
  const BLOGS = useMemo(() => allBlogs.filter((b) => b.status === 'Published'), [allBlogs])

  const activeCategory = searchParams.get('category') || 'All'
  const CATEGORIES = useMemo(() => ['All', ...new Set(BLOGS.map((b) => b.category))], [BLOGS])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BLOGS.filter((b) => {
      const matchesCategory =
        activeCategory === 'All' || b.category?.toLowerCase() === activeCategory.toLowerCase()
      const matchesQuery =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.shortDesc?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [BLOGS, activeCategory, query])

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

      {!loading && !error && CATEGORIES.length > 1 && (
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
      )}

      {loading ? (
        <LoadingState label="Loading posts…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-secondary py-20">
          <p>{BLOGS.length === 0 ? 'No posts published yet.' : 'No posts match your search.'}</p>
          {BLOGS.length > 0 && (
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