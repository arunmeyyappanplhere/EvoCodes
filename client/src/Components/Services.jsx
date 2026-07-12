import { motion } from 'framer-motion'
import { BrainCircuit, Globe2, Fingerprint, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: BrainCircuit,
    title: 'AI Solutions',
    desc: 'Custom neural networks and LLM integration designed to automate complex workflows and surface actionable insights.',
    tags: ['RAG', 'NLP', 'MLOps'],
  },
  {
    icon: Globe2,
    title: 'Web Architectures',
    desc: 'High-performance, edge-first web applications built with the most modern tech stacks for ultimate speed and scale.',
    tags: ['React', 'Rust', 'Cloud Native'],
  },
  {
    icon: Fingerprint,
    title: 'Digital Identity',
    desc: 'Premium UI/UX design that defines your brand\u2019s digital presence through movement, depth, and glassmorphic beauty.',
    tags: ['Fluid', 'Branding', 'Interactive'],
  },
]

export default function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl lg:text-4xl"
          >
            Engineered Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-gray-secondary max-w-md"
          >
            Precision-built services tailored for the next generation of
            digital-first enterprises.
          </motion.p>
        </div>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-medium"
        >
          View All Services <ArrowRight size={15} />
        </motion.a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.4)' }}
            className="card-border bg-charcoal rounded-2xl p-7 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 mb-6">
              <s.icon size={20} />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2.5">
              {s.title}
            </h3>
            <p className="text-sm text-gray-secondary leading-relaxed mb-6">
              {s.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-cyan-400/20 text-cyan-400/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
