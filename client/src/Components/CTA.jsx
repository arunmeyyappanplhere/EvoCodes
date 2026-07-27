import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navi = useNavigate();

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 lg:px-10 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-transparent px-8 py-20 text-center"
      >
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[130px]" />

        <div className="relative">
          <h2 className="font-display font-bold text-3xl lg:text-5xl leading-tight">
            Ready to evolve your
            <br />
            <span className="text-gradient">digital footprint?</span>
          </h2>
          <p className="mt-5 text-gray-secondary max-w-lg mx-auto">
            Partner with a team that speaks the language of tomorrow. Let's
            discuss your next breakthrough project today.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              onClick={() => navi("/contact")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(34,211,238,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-cyan-400 text-black text-sm font-semibold px-7 py-3.5 rounded-full"
            >
              Schedule a Consultation
            </motion.a>
            <motion.a
              onClick={() => navi("/pricing")}
              whileHover={{ scale: 1.03, borderColor: "rgba(34,211,238,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="border border-white/15 text-white text-sm font-medium px-7 py-3.5 rounded-full"
            >
              View Pricing
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
