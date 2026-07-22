import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  Layers,
  CloudCog,
  Smartphone,
  ShieldCheck,
  GitBranch,
  Radio,
  PenTool,
  Zap,
  ArrowRight,
  X,
} from "lucide-react";

const services = [
  {
    icon: BrainCircuit,
    head: "AI & Machine Learning",
    title: "Artificial Intelligence",
    desc: "LLM orchestration, custom neural networks, and predictive analytics.",
    color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/25",
    stack: ["PyTorch", "LangChain", "RAG", "NLP", "MLOps"],
  },
  {
    icon: Layers,
    head: "Web Engineering",
    title: "Full Stack Dev",
    desc: "High-performance React/Next.js frontends with robust Node.js backends.",
    color: "text-violet-400 bg-violet-400/10 border-violet-400/25",
    stack: ["React", "Next.js", "Node.js", "GraphQL", "PostgreSQL"],
  },
  {
    icon: CloudCog,
    head: "Cloud Infrastructure",
    title: "Cloud Systems",
    desc: "AWS/GCP infrastructure, Kubernetes scaling, and serverless compute.",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/25",
    stack: ["AWS", "GCP", "Kubernetes", "Terraform", "Serverless"],
  },
  {
    icon: Smartphone,
    head: "Mobile Engineering",
    title: "Mobile Native",
    desc: "Cross-platform Flutter and React Native apps with native performance.",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    stack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    icon: ShieldCheck,
    head: "Security & Compliance",
    title: "Cybersecurity",
    desc: "Penetration testing, zero-trust architecture, and data encryption.",
    color: "text-slate-300 bg-slate-300/10 border-slate-300/25",
    stack: ["Zero Trust", "OWASP", "SIEM", "IAM", "Encryption"],
  },
  {
    icon: GitBranch,
    head: "Delivery Automation",
    title: "DevOps & CI/CD",
    desc: "Automated deployment pipelines and infrastructure as code.",
    color: "text-teal-400 bg-teal-400/10 border-teal-400/25",
    stack: ["Docker", "GitHub Actions", "ArgoCD", "IaC", "Prometheus"],
  },
  {
    icon: Radio,
    head: "Connected Systems",
    title: "IoT Integration",
    desc: "Connecting hardware with enterprise software ecosystems seamlessly.",
    color: "text-pink-400 bg-pink-400/10 border-pink-400/25",
    stack: ["MQTT", "Edge Computing", "AWS IoT", "Sensors", "BLE"],
  },
  {
    icon: PenTool,
    head: "Product Design",
    title: "UI/UX Strategy",
    desc: "Design systems and user research for technical interfaces.",
    color: "text-sky-400 bg-sky-400/10 border-sky-400/25",
    stack: ["Figma", "Design Systems", "User Research", "Prototyping"],
  },
  {
    icon: Zap,
    head: "Systems Optimization",
    title: "Performance Audit",
    desc: "Optimizing legacy systems for millisecond-speed responsiveness.",
    color: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    stack: ["Profiling", "Caching", "CDN", "Load Testing", "Observability"],
  },
];

function ServiceModal({ service, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!service) return null;
  const Icon = service.icon;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_60px_rgba(34,211,238,0.12)] p-8"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute hover:cursor-pointer top-5 right-5 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
          >
            <X size={16} />
          </button>

          <div
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 ${service.color}`}
          >
            <Icon size={26} />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400">
            {service.head}
          </span>

          <h3 className="font-display font-bold text-2xl mt-2 mb-4">
            {service.title}
          </h3>

          <p className="text-sm text-gray-secondary leading-relaxed mb-7">
            {service.desc}
          </p>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-gray-secondary block mb-3">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {service.stack.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2.5 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ServicesOnHome() {
  const [active, setActive] = useState(null);

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
          Engineering Tomorrow
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-gray-secondary max-w-xl"
        >
          From AI-powered platforms to enterprise cloud solutions, we build
          software that drives the next generation of business.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.4)" }}
            className="card-border bg-charcoal rounded-2xl p-7 transition-colors flex flex-col"
          >
            <div
              className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-6 ${s.color}`}
            >
              <s.icon size={20} />
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

      {active && (
        <ServiceModal service={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
