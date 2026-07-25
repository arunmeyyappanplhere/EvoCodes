import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useFetch } from '../hooks/useFetch.js'
import { transformService } from '../utils/transformers.js'
import { LoadingState, ErrorState, EmptyState } from './DataState.jsx'
import ServiceModal from './ServiceModal.jsx'

export default function Services() {
  const [active, setActive] = useState(null)
  document.title = 'EVO CODES | Services'

  const transform = useCallback((s) => transformService(s), [])
  const { data: services, loading, error, refetch } = useFetch('/services', { transform })

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 border border-cyan-400/25 bg-cyan-400/5 rounded-full px-4 py-1.5 mb-6"
        >
          Engineering Excellence
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-3xl lg:text-5xl leading-tight max-w-2xl"
        >
          Advanced Digital Infrastructure for Modern Enterprises
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-gray-secondary max-w-xl"
        >
          From generative AI architectures to global-scale cloud deployments,
          we craft the software that powers tomorrow&rsquo;s industry leaders.
        </motion.p>
      </div>

      {loading ? (
        <LoadingState label="Loading services…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : services.length === 0 ? (
        <EmptyState message="No services published yet." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.4)' }}
              className="card-border bg-charcoal rounded-2xl p-7 transition-colors flex flex-col"
            >
              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-6 overflow-hidden ${s.color}`}
              >
                {s.iconUrl ? (
                  <img src={s.iconUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  s.icon && <s.icon size={20} />
                )}
              </div>
              <h3 className="font-display font-semibold text-lg mb-2.5">
                {s.title}
              </h3>
              <p className="text-sm text-gray-secondary leading-relaxed mb-6 flex-1">
                {s.desc}
              </p>
              <motion.button
                onClick={() => setActive(s)}
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-medium w-fit hover:cursor-pointer"
              >
                Explore Technology <ArrowRight size={15} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}

      {active && (
        <ServiceModal service={active} onClose={() => setActive(null)} />
      )}
    </section>
  )
}