import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../lib/api.js";

// Static fallbacks for the two metrics your backend doesn't track anywhere
// (support hours, on-time delivery rate). If you later add fields for these
// -- e.g. a `deliveredOnTime` flag on projects -- swap the hardcoded values
// below for a computed one the same way projectsDelivered/certifiedDevs are.
const FALLBACK_STATS = [
  { key: "projects", value: "150", label: "Projects Delivered" },
  { key: "support", value: "24/7", label: "Technical Support" },
  { key: "employees", value: "45", label: "Certified Developers" },
  { key: "onTime", value: "100%", label: "On-Time Delivery" },
];

export default function Stats() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Landing endpoint (GET /) returns { services, projects, testimonials, employees }
    // in one payload -- that's why this doesn't use the useFetch hook, which
    // expects a plain array response.
    api
      .get("/")
      .then((res) => {
        if (cancelled) return;
        const { projects = [], employees = [] } = res.data || {};

        setStats([
          {
            key: "projects",
            value: `${projects.length}+`,
            label: "Projects Delivered",
          },
          { key: "support", value: "24/7", label: "Technical Support" },
          {
            key: "employees",
            value: `${employees.length}+`,
            label: "Certified Developers",
          },
          { key: "onTime", value: "100%", label: "On-Time Delivery" },
        ]);
      })
      .catch(() => {
        // Keep the static fallback numbers on failure -- an empty/error
        // stats bar looks broken, static-but-plausible numbers don't.
        if (!cancelled) setStats(FALLBACK_STATS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="border-y border-cyan-400/10 bg-charcoal/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display font-bold text-3xl lg:text-4xl text-gradient">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-white/5 rounded animate-pulse" />
              ) : (
                s.value
              )}
            </div>
            <div className="mt-2 text-xs lg:text-sm text-gray-secondary font-mono uppercase tracking-wider">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}