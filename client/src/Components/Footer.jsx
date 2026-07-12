import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";

const columns = [
  {
    title: "Solutions",
    links: [
      "AI Integration",
      "SaaS Architecture",
      "Design Systems",
      "Blockchain Labs",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Our Mentor", "Career", "Journal"],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-cyan-400/10 bg-charcoal/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <span className="font-display font-bold text-xl text-gradient">
            Evo Codes
          </span>
          <p className="mt-4 text-sm text-gray-secondary leading-relaxed max-w-xs">
            Pioneering the intersection of algorithmic intelligence and premium
            digital design.
          </p>
          <div className="flex gap-3 mt-6">
            {[FaGithub, FaTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-5">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-gray-secondary hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-5">
            Newsletter
          </h4>
          <p className="text-sm text-gray-secondary mb-4">
            Stay updated with the latest in tech.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 bg-slate-deep rounded-full border border-cyan-400/15 p-1.5 pl-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="bg-transparent text-sm text-white placeholder:text-gray-secondary flex-1 outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0"
              aria-label="Subscribe"
            >
              <Send size={13} />
            </motion.button>
          </form>
        </div>
      </div>

      <div className="border-t border-cyan-400/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-secondary">
          <span>© 2026 Evo Codes. Engineered for the Future.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}