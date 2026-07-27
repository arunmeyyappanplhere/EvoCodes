import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import blogsBanner from "/public/blogs_cover.png";
import projectsBanner from "/public/projects_cover.png";
import researchBanner from "/public/research_cover.png";
const minorProjects = [
  {
    title: "Lumina Mobile App",
    subtitle: "Modern IoT Ecosystem Control",
    image: blogsBanner,
  },
  {
    title: "Core Network v2",
    subtitle: "Global Cloud Infrastructure",
    image: researchBanner,
  },
];

export default function ProjectsOnHome() {
  const navi = useNavigate();
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="font-display font-bold text-3xl lg:text-4xl">
          Flagship Ventures
        </h2>
        <p className="mt-3 text-gray-secondary">
          Selected works from our laboratory of digital innovations.
        </p>
      </motion.div>
      {/* Featured project */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        whileHover={{
          y: -10,
          borderColor: "rgba(34,211,238,0.45)",
        }}
        className="
    group
    relative
    overflow-hidden
    card-border
    rounded-3xl
    h-[420px]
    lg:h-[480px]
    mb-6
    transition-all
    duration-700
    hover:shadow-[0_0_90px_rgba(34,211,238,0.18)]
  "
      >
        {/* Background Image */}
        <div
          className="
      absolute inset-0
      bg-cover bg-center
      transition-all
      duration-[1200ms]
      ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:scale-[1.08]
      group-hover:brightness-125
      group-hover:contrast-110
      group-hover:saturate-125
    "
          style={{
            backgroundImage: `url(${projectsBanner})`,
          }}
        />

        {/* Base Dark Overlay */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-r
      from-black/90
      via-black/70
      to-black/35
      transition-all
      duration-700
      group-hover:from-black/45
      group-hover:via-black/20
      group-hover:to-transparent
    "
        />

        {/* Cyan Glow */}
        <div
          className="
      absolute inset-0
      opacity-0
      transition-all
      duration-700
      group-hover:opacity-100
      bg-gradient-to-br
      from-cyan-400/20
      via-cyan-300/5
      to-transparent
      mix-blend-screen
    "
        />

        {/* Soft Spotlight */}
        {/* <div
          className="
      absolute inset-0
      opacity-0
      transition-all
      duration-700
      group-hover:opacity-100
      bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.22),transparent_65%)]
    "
        /> */}

        {/* Decorative Blur */}
        <div
          className="
      absolute
      -right-24
      -top-24
      w-72
      h-72
      rounded-full
      bg-cyan-400/15
      blur-[100px]
      transition-all
      duration-1000
      group-hover:scale-150
      group-hover:bg-cyan-400/30
    "
        />

        {/* Content */}
        <div
          className="
      relative
      z-10
      flex
      h-full
      items-end
      p-8
      lg:p-14
      transition-all
      duration-700
      group-hover:pb-16
    "
        >
          <div className="max-w-xl">
            <span
              className="
          inline-block
          text-[11px]
          font-mono
          px-3
          py-1
          rounded-full
          border
          border-cyan-400/30
          text-cyan-300
          mb-6
          backdrop-blur-sm
          transition-all
          duration-700
          group-hover:bg-cyan-400/10
          group-hover:border-cyan-300/70
        "
            >
              CASE STUDY: MEGA VII
            </span>

            <h3
              className="
          font-display
          font-bold
          text-3xl
          lg:text-5xl
          leading-tight
          mb-5
          text-white
          transition-all
          duration-700
          group-hover:-translate-y-1
          group-hover:text-cyan-50
        "
            >
              Revolutionizing Data Intelligence for FinTech
            </h3>

            <p
              className="
          text-gray-300
          text-base
          leading-relaxed
          mb-8
          max-w-lg
          transition-all
          duration-700
          group-hover:text-white
        "
            >
              We built a proprietary real-time analysis engine that processes
              millions of transactions per second, powered by a custom-trained
              neural core for anomaly detection.
            </p>

            <div className="flex items-center gap-6">
              <motion.button
                onClick={() => navi("/projects")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="
            inline-flex
            items-center
            gap-2
            bg-cyan-400
            text-black
            text-sm
            font-semibold
            px-6
            py-3
            rounded-full
            shadow-lg
            shadow-cyan-400/20
          "
              >
                Explore Project <ArrowRight size={16} />
              </motion.button>

              <span
                className="
            text-xs
            font-mono
            tracking-widest
            text-gray-400
            transition-colors
            duration-700
            group-hover:text-cyan-200
          "
              >
                01 — AI FINANCIAL ENGINE
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Minor projects */}
      <div className="grid md:grid-cols-2 gap-6">
        {" "}
        {minorProjects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -10, borderColor: "rgba(34,211,238,0.45)" }}
            className=" group relative overflow-hidden rounded-2xl h-72 cursor-pointer card-border transition-all duration-700 hover:shadow-[0_0_70px_rgba(34,211,238,0.18)] "
          >
            {" "}
            {/* Background Image */}{" "}
            <div
              className=" absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.12] group-hover:brightness-125 group-hover:contrast-110 group-hover:saturate-125 "
              style={{ backgroundImage: `url(${p.image})` }}
            />{" "}
            {/* Base Overlay */}{" "}
            <div className=" absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15 transition-all duration-700 group-hover:from-black/40 group-hover:via-black/10 group-hover:to-transparent " />{" "}
            {/* Cyan Glow */}{" "}
            <div className=" absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/20 via-cyan-300/5 to-transparent mix-blend-screen " />{" "}
            {/* Spotlight */}{" "}
            {/* <div className=" absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.22),transparent_65%)] " />{" "} */}
            {/* Floating Neon Blur */}{" "}
            <div className=" absolute -top-16 -right-16 w-48 h-48 rounded-full bg-cyan-400/15 blur-[80px] transition-all duration-1000 group-hover:scale-150 group-hover:bg-cyan-400/30 " />{" "}
            {/* Content */}{" "}
            <div className=" relative z-10 flex h-full items-end p-8 transition-all duration-700 group-hover:pb-10 ">
              {" "}
              <div>
                {" "}
                <h4 className=" font-display text-white text-2xl font-semibold mb-2 transition-all duration-700 group-hover:-translate-y-1 group-hover:text-cyan-50 ">
                  {" "}
                  {p.title}{" "}
                </h4>{" "}
                <p className=" text-gray-300 text-sm transition-all duration-700 group-hover:text-white ">
                  {" "}
                  {p.subtitle}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>
        ))}{" "}
      </div>
    </section>
  );
}
