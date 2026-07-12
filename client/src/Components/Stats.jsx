import { motion } from 'framer-motion'

const stats = [
  { value: '150', label: 'Projects Delivered' },
  { value: '12', label: 'AI Patents' },
  { value: '45', label: 'Tech Partners' },
  { value: '98%', label: 'Client Retention' },
]

export default function Stats() {
  return (
    <section className="border-y border-cyan-400/10 bg-charcoal/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display font-bold text-3xl lg:text-4xl text-gradient">
              {s.value}
            </div>
            <div className="mt-2 text-xs lg:text-sm text-gray-secondary font-mono uppercase tracking-wider">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
