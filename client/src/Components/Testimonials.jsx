import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import { transformTestimonial } from "../utils/Transformers.js";
import { LoadingState, ErrorState, EmptyState } from "./DataState.jsx";
import Modal from "./Modal.jsx";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Testimonials() {
  const transform = useCallback((t) => transformTestimonial(t), []);
  const { data: allTestimonials, loading, error, refetch } = useFetch("/testimonials", { transform });

  // Only surface testimonials the admin has approved for the public site.
  const TESTIMONIALS = useMemo(
    () => allTestimonials.filter((t) => t.status === "Published"),
    [allTestimonials]
  );

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <section id="testimonials" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-400 text-xs font-mono tracking-wide mb-6">
            CLIENT VOICES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            Trusted by teams who ship
          </h2>
          <p className="mt-3 text-gray-secondary max-w-lg mx-auto">
            Real feedback from the founders and engineering leads we've partnered with.
          </p>
        </motion.div>

        {loading ? (
          <LoadingState label="Loading testimonials…" />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : TESTIMONIALS.length === 0 ? (
          <EmptyState message="No testimonials published yet." />
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {TESTIMONIALS.slice(0,3).map((t) => (
              <motion.div
                key={t.id}
                variants={cardIn}
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.5)" }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedTestimonial(t)}
                className="relative bg-charcoal/40 border border-cyan-400/15 rounded-2xl p-8 flex flex-col cursor-pointer"
              >
                <Quote className="text-cyan-400/30 mb-4" size={28} />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                <p className="text-sm text-white/85 leading-relaxed flex-1 line-clamp-4">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 mt-7 pt-6 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 text-xs font-semibold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-secondary">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Medium-sized modal for full testimonial detail */}
      <Modal
        open={!!selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
        widthClass="max-w-2xl"
      >
        {selectedTestimonial && (
          <div className="flex flex-col">
            <Quote className="text-cyan-400/40 mb-5" size={36} />

            <div className="flex gap-1 mb-5">
              {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-cyan-400 text-cyan-400" />
              ))}
            </div>

            <p className="text-base text-white/90 leading-relaxed mb-8">
              "{selectedTestimonial.quote}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 text-sm font-semibold">
                {selectedTestimonial.initials}
              </div>
              <div>
                <p className="text-base font-semibold text-white">{selectedTestimonial.name}</p>
                <p className="text-sm text-gray-secondary">{selectedTestimonial.role}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}