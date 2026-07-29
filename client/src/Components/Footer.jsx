import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import { Mail } from "lucide-react";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "AI Integration", href: "/services" },
      { label: "SaaS Architecture", href: "/services" },
      { label: "Design Systems", href: "/services" },
      { label: "Blockchain Labs", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <footer className="border-t border-cyan-400/10 bg-charcoal/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            {/* <motion.img
              src={logo}
              alt="Evo Codes logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(34,211,238,0)',
                  '0 0 16px rgba(34,211,238,0.55)',
                  '0 0 0px rgba(34,211,238,0)',
                ],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08, rotate: -4 }}
            /> */}
            <span className="font-display font-bold text-xl text-gradient">
              Evo Codes
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-secondary leading-relaxed max-w-xs">
            Pioneering the intersection of algorithmic intelligence and premium
            digital design.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <a
              href="https://github.com/evocodes-official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="https://x.com/EvoCodes_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
            >
              <FaXTwitter size={15} />
            </a>
            <a
              href="https://www.linkedin.com/company/evo-codes/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
            >
              <FaLinkedin size={15} />
            </a>
            <a
              href="https://www.instagram.com/evocodes.dev?igsh=cWhlaWVjOWc0NXkz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href="https://www.facebook.com/share/1DFGwPJQpH/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
            >
              <FaFacebook size={15} />
            </a>
            <a
              href="https://wa.me/+919042949000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
            >
              <SiWhatsapp size={15} />
            </a>
            <a
              href="mailto:evocodes.co@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center text-gray-secondary hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-5">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-sm text-gray-secondary hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
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
            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-white transition-colors text-xs text-gray-secondary cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="hover:text-white transition-colors text-xs text-gray-secondary cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-white transition-colors text-xs text-gray-secondary cursor-pointer"
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}