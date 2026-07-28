import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { User, Target, Eye } from "lucide-react";
import axios from "axios";

import ArunProfile from "/public/arun.jpeg";
import AswinProfile from "/public/aswin.jpeg";
import DeepakProfile from "/public/deepak.jpeg";
import KheerthnaProfile from "/public/kheerthna.jpeg";
import RohtihProfile from "/public/rohith.jpeg";

const CountUp = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const numericEnd = parseInt(end) || 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numericEnd * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const navi = useNavigate();

  // 1. Initialized as null so we know data hasn't arrived yet
  const [statsData, setStatsData] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    document.title = "EVO CODES | About";

    const fetchStats = async () => {
      try {
        const res1 = await axios.get(
          "https://evocodesbackend.onrender.com/api/testimonials/stats",
        );
        const res2 = await axios.get("https://evocodesbackend.onrender.com/api/");
        const { projects, employees } = res2.data;

        const { averageRating } = res1.data;
        console.log(projects, employees);
        console.log(averageRating);

        setStatsData({
          totalProjects: projects ? projects.length : 0,
          expertDevs: employees ? employees.length : 0,
          supportHours: 24,
          satisfaction: averageRating ? Math.round(averageRating * 20) : 99,
        });
      } catch (err) {
        console.error("Failed to fetch stats from backend", err);
        setStatsData({
          totalProjects: 0,
          expertDevs: 0,
          supportHours: 24,
          satisfaction: 99,
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  // 3. Map stats directly from backend data when loaded
  const stats = statsData
    ? [
        {
          label: "Projects Delivered",
          value: statsData.totalProjects,
          suffix: "+",
        },
        {
          label: "Client Satisfaction",
          value: statsData.satisfaction,
          suffix: "%",
        },
        {
          label: "Expert Developers",
          value: statsData.expertDevs,
          suffix: "+",
        },
        {
          label: "Dedicated Support",
          value: statsData.supportHours,
          suffix: "/7",
        },
      ]
    : [];

  const coreValues = [
    {
      emoji: "🚀",
      title: "Innovation First",
      description:
        "We push the boundaries of technology to craft futuristic digital solutions that stand out.",
    },
    {
      emoji: "⚡",
      title: "High Performance",
      description:
        "Speed, efficiency, and scalability are baked into every line of code we write.",
    },
    {
      emoji: "🛡️",
      title: "Uncompromised Quality",
      description:
        "Rigorous testing and modern architecture ensure secure, robust, and reliable products.",
    },
    {
      emoji: "🤝",
      title: "Client-Centric",
      description:
        "Your vision drives our development. We collaborate closely to turn ideas into reality.",
    },
  ];

  const team = [
    { name: "ARUN MEYYAPPAN", role: "Founder & CEO", image: ArunProfile },
    { name: "ROHITH", role: "Founder & CFOO", image: RohtihProfile },
    { name: "ASWIN", role: "CTO & Lead Developer", image: AswinProfile },
    { name: "KHEERTHNA", role: "CMO", image: KheerthnaProfile },
    { name: "DEEPAK KUMAR", role: "Project Manager", image: DeepakProfile },
  ];

  return (
    <section className="min-h-screen bg-[#050A0A] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        {/* Header Section */}
        <div className="text-center">
          <span className="px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 tracking-widest text-sm uppercase">
            ABOUT EVO CODES
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
            Evolving Ideas Into
            <span className="block text-cyan-400">Digital Reality</span>
          </h1>

          <p className="mt-5 text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            At EVO CODES, we are a collective of passionate developers,
            designers, and innovators. We engineer high-impact digital
            experiences that help businesses evolve and dominate the modern tech
            landscape.
          </p>
        </div>

        {/* Dynamic Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loadingStats
            ? // Loading Skeletons
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 text-center animate-pulse"
                  >
                    <div className="h-10 w-24 bg-cyan-400/20 rounded mx-auto mb-3"></div>
                    <div className="h-4 w-32 bg-gray-700/50 rounded mx-auto"></div>
                  </div>
                ))
            : // Render Stats once backend data arrives
              stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 text-center hover:border-cyan-400 transition duration-300"
                >
                  <h3 className="text-4xl md:text-5xl font-bold text-cyan-400">
                    <CountUp
                      key={stat.value}
                      end={stat.value}
                      suffix={stat.suffix}
                    />
                  </h3>
                  <p className="text-gray-400 mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
        </div>

        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-[#0B1112] border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-lg flex flex-col justify-between hover:border-cyan-400/40 transition duration-300">
            <div>
              <Target className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl font-bold mt-4 mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Empowering businesses with scalable, user-focused software and
                IoT that drives innovation and growth.
              </p>
            </div>
          </div>

          <div className="bg-[#0B1112] border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-lg flex flex-col justify-between hover:border-cyan-400/40 transition duration-300">
            <div>
              <Eye className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl font-bold mt-4 mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Leading the future of digital innovation through reliable,
                high-quality software solutions and IoT systems.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Driven By <span className="text-cyan-400">Core Values</span>
            </h2>
            <p className="text-gray-400 mt-3">
              The foundational principles guiding everything we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <ValueCard key={idx} {...value} />
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <span className="px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 tracking-widest text-sm uppercase">
              MEET THE TEAM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6">
              The People Behind <span className="text-cyan-400">EVO CODES</span>
            </h2>
            <p className="text-gray-400 mt-3">
              A dedicated crew of builders, thinkers, and problem-solvers.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15, delayChildren: 0.1 },
              },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {team.map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-[#0B1112] border border-cyan-400/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden backdrop-blur-lg">
          <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-bold relative z-10">
            Ready to Evolve Your Digital Presence?
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto relative z-10 text-lg">
            Let's collaborate to build something extraordinary. Get in touch
            with our engineering team today.
          </p>
          <div className="mt-8 relative z-10 flex justify-center">
            <button
              onClick={() => navi("/contact")}
              className="bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,255,.45)] transition-all duration-300 hover:scale-105 inline-block cursor-pointer"
            >
              Get In Touch →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ emoji, title, description }) => (
  <div className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400 transition duration-300 flex flex-col justify-between">
    <div>
      <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl mb-5">
        {emoji}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const TeamCard = ({ name, role, image }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30, scale: 0.96 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: "easeOut" },
      },
    }}
    whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.5)" }}
    transition={{ duration: 0.25 }}
    className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 flex flex-col items-center text-center"
  >
    <div className="w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center overflow-hidden mb-5">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <User className="w-10 h-10 text-cyan-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-cyan-400 text-sm mt-1">{role}</p>
  </motion.div>
);

export default About;
